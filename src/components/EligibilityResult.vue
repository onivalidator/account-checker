<script setup>
import {useLoaderStore } from "../store"
import { storeToRefs } from "pinia"
import SingleEligibility from "./SingleEligibility.vue";
import DoubleEligibility from "./DoubleEligibility.vue";
import NotEligible from "./NotEligible.vue";

const loaderStore = useLoaderStore();
const { loading, error,  eligible, double, address, submitted, manual, evmosStaked, } = storeToRefs(loaderStore);


let reset = () => {
  address.value = "";
  eligible.value = false;
  double.value = false;
  submitted.value = false;
  error.value = false;
  loading.value = false;
  manual.value = false;
}

</script>       
<template>
  <v-card-title>Eligibility</v-card-title>
  <v-card-text>
    <v-progress-circular indeterminate v-if="loading && !error"></v-progress-circular>
    <v-alert v-if="error" type="error">The public RPC server is having some troubles. Please try again.</v-alert>
    <div v-if="!loading && !error">
    <div class="mb-5">
      <div class="text-h6 mb-3">Your current 🥩 with Stake Frites 🍟</div>
      <v-chip class="mr-3" size="large" label color="primary"><strong class="mr-1">{{Math.floor(evmosStaked.amount)}}</strong> EVMOS</v-chip>
    </div>
    <NotEligible v-if="!eligible"/>
    <SingleEligibility v-if="eligible && !double"/>
    <DoubleEligibility v-if="eligible && double"/>
    </div>
  </v-card-text>
  <v-card-actions>
    <v-btn @click="reset">Check again</v-btn>
  </v-card-actions>
</template>