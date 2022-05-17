import { fromBech32, normalizeBech32, toBech32 } from "@cosmjs/encoding";
import axios from "axios";
import CosmosDirectory from "./CosmosDirectory.mjs";
import _ from "lodash";
import {
  setupStakingExtension,
  QueryClient as CosmjsQueryClient,
  setupBankExtension,
  setupDistributionExtension,
  setupMintExtension,
  setupGovExtension,
  setupIbcExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

const mapAsync = async (array, fn) => {
  let promises = await Promise.allSettled(array.map(fn));
  return promises.map((p) => {
    if (p.status == "fulfilled") {
      return p.value;
    } else {
      return false;
    }
  });
};

const makeClient = async (rpcUrl) => {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return CosmjsQueryClient.withExtensions(
    tmClient,
    setupStakingExtension,
    setupIbcExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupMintExtension,
    setupGovExtension
  );
};

export class Chains {
  constructor(enabled) {
    this.enabled = enabled;
    this.chains = [];
  }
  async init() {
    const directory = CosmosDirectory();
    let chains = await directory.getChains();
    console.log(this.enabled);
    chains = Object.values(chains).filter((c) => this.enabled.includes(c.name));
    this.chains = await mapAsync(chains, async (c) => {
      const chainData = await directory.getChainData(c.name);
      return {
        ...c,
        prefix: chainData.bech32_prefix,
        decimals: c.decimals,
      };
    });
  }
}

export class Account {
  constructor(address, chains) {
    this.address = address;
    this.chains = chains;
    this.eligible = false;
    this.double = false;
    this.juno = {
      address: "",
      prefix: "juno",
      rpc: "",
      delegated: false,
      amount: 0,
      other: [],
    };
    this.cosmoshub = {
      address: "",
      prefix: "cosmos",
      rpc: "",
      delegated: false,
      amount: 0,
      other: [],
    };
  }

  init = async () => {
    try {
      await this.getAddresses();
      await this.chains.map((c) => {
        let rpc = c.best_apis.rpc[0].address;
        c.name === "cosmoshub"
          ? (this.cosmoshub.rpc = rpc)
          : (this.juno.rpc = rpc);
      });
      await this.getEligibility();
    } catch (error) {
      return error;
    }
  };

  getAddresses = () => {
    const decoded = fromBech32(this.address);
    this.juno.address = toBech32(this.juno.prefix, decoded.data);
    this.cosmoshub.address = toBech32(this.cosmoshub.prefix, decoded.data);
  };

  getEligibility = async () => {
    const cosmosVal = "cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2";
    const junoVal = "junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu";
    const cosmosClient = await makeClient(this.cosmoshub.rpc);
    const junoClient = await makeClient(this.juno.rpc);
    const stakedCosmos = await cosmosClient.staking.delegatorDelegations(
      this.cosmoshub.address
    );
    const cosmosStakedMap = stakedCosmos.delegationResponses.map((d) => ({
      validator: d.delegation.validatorAddress,
      amount: d.delegation.shares,
    }));
    const stakedJuno = await junoClient.staking.delegatorDelegations(
      this.juno.address
    );
    const junoStakedMap = stakedJuno.delegationResponses.map((d) => ({
      validator: d.delegation.validatorAddress,
      amount: d.delegation.shares,
    }));

    const stkJuno = junoStakedMap.find((s) => s.validator == junoVal);
    const stkCosmos = cosmosStakedMap.find((s) => s.validator == cosmosVal);

    if (stkJuno) {
      this.juno.delegated = true;
      this.juno.amount = stkJuno.amount / Math.pow(10, 18 + 6);
      this.eligible = stkJuno.amount / Math.pow(10, 18 + 6) > 5;
    }

    if (stkCosmos) {
      console.log("staked");
      this.cosmoshub.delegated = true;
      this.cosmoshub.amount = stkCosmos.amount / Math.pow(10, 18 + 6);
      this.double = stkJuno.amount / Math.pow(10, 18 + 6) > 5;
    }
  };
}
