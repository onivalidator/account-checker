import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    currentVP: 24668,
    goalVP: 30000,
    percentLeft: 0.15,
    progressLoading: true,
    loading: false,
    error: false,
    keplr: false,
    address: "",
    eligible: false,
    submitted: false,
    double: false,
    cosmosValidator: {},
    junoValidator: {},
    evmosValidator: {},
    manual: false,
    isFormValid: false,
    errorMessages: "",
    evmosDelegation: false,
    evmosStaked: {},
  }),
  getters: {},
  actions: {},
});
