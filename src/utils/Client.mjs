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

export class Validators {
  constructor(validators) {
    this.validators = validators;
    this.directory = CosmosDirectory();
  }
  getValidators = async () => {
    return await mapAsync(
      this.validators.filter((val) => val.chain !== "nomic"),
      async (validator) => {
        const client = await makeClient(this.directory.rpcUrl(validator.chain));
        const operator = validator.validator;
        const fetchValidator = await client.staking.validator(operator);
        return { [validator.chain]: fetchValidator.validator };
      }
    );
  };
}

export class Validator {
  constructor(chains) {
    this.juno = "junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu";
    this.cosmoshub = "cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2";
    this.evmos = "evmosvaloper1pz3mcahcrglf3md4lggax5r95gvmppc6x5w7hw";
    this.chains = chains;
    this.junoRpc = "https://rpc.cosmos.directory/juno";
    this.cosmosRpc = "https://rpc.cosmos.directory/cosmoshub";
    this.evmosRpc = "https://rpc.cosmos.directory/evmos";
  }

  init = async () => {
    this.cosmosClient = await makeClient(this.cosmosRpc);
    this.junoClient = await makeClient(this.junoRpc);
    this.evmosClient = await makeClient(this.evmosRpc);
  };

  getJunoValidator = async () => {
    const val = await this.junoClient.staking.validator(this.juno);
    return val.validator;
  };
  getCosmosValidator = async () => {
    const val = await this.cosmosClient.staking.validator(this.cosmoshub);
    return val.validator;
  };
  getEvmosValidator = async () => {
    const val = await this.evmosClient.staking.validator(this.evmos);
    return val.validator;
  };
}

export class Account {
  constructor(address) {
    this.address = address;
    this.eligible = false;
    this.evmos = {
      address: "",
      prefix: "evmos",
      rpc: "https://rpc.cosmos.directory/evmos",
      delegated: false,
      amount: 0,
      other: [],
    };
  }

  init = async () => {
    try {
      await this.getEligibility();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getEligibility = async () => {
    const evmosVal = "evmosvaloper1pz3mcahcrglf3md4lggax5r95gvmppc6x5w7hw";

    const evmosClient = await makeClient(this.evmos.rpc);
    const stakedEvmos = await evmosClient.staking.delegatorDelegations(
      this.address
    );
    const evmosStakedMap = stakedEvmos.delegationResponses.map((d) => ({
      validator: d.delegation.validatorAddress,
      amount: d.delegation.shares,
    }));

    const stkEvmos = evmosStakedMap.find((s) => s.validator == evmosVal);

    if (stkEvmos) {
      this.evmos.delegated = true;
      this.evmos.amount = stkEvmos.amount / Math.pow(10, 18 + 12 + 6);
      this.eligible = stkEvmos.amount / Math.pow(10, 18 + 12 + 6) > 25;
      this.double = stkEvmos.amount / Math.pow(10, 18 + 12 + 6) > 50;
    }
  };
}

export const validateAddress = (address) => {
  try {
    fromBech32(address);
    return true;
  } catch (error) {
    return false;
  }
};
