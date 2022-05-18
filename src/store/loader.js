import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    currentVP: 8700,
    goalVP: 10000,
    percentLeft: 0.13,
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
    manual: false,
    isFormValid: false,
    errorMessages: "",
    cosmosDelegation: false,
    cosmoshubStaked: {},
    junoStaked: {},
  }),
  getters: {},
  actions: {},
});
