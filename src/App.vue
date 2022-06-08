<script setup>
import { onMounted, onBeforeMount } from 'vue'
import {  Validator, Validators } from "./utils/Client"
import {storeToRefs} from "pinia"
import {useLoaderStore, useValidatorStore } from "./store"
import HeadingRow from "./components/HeadingRow.vue"
import ValidatorList from "./components/ValidatorList.vue"
import EligibilityForm from "./components/EligibilityForm.vue"
import EligibilityResult from "./components/EligibilityResult.vue"
import EligibilityCardHeader from "./components/EligibilityCardHeader.vue"
import Footer from "./components/Footer.vue"

const loaderStore = useLoaderStore();
const validatorStore = useValidatorStore();
const {currentVP, goalVP, percentLeft, progressLoading,keplr, chains,  submitted, cosmosValidator, junoValidator, evmosValidator} = storeToRefs(loaderStore);

const {validators} = storeToRefs(validatorStore);



onBeforeMount(() => {
  if (window.keplr) {
    keplr.value = true;
  } else {
    keplr.value = false;
  }
})

onMounted(async () => {
  progressLoading.value = true;
  const validatorFetcher = new Validator();
  await validatorFetcher.init();
  const validatorsFetcher = new Validators(validators.value);
  const validatorsData = await validatorsFetcher.getValidators();
  validatorsData.forEach((val) => {
    let chainName = Object.keys(val)[0];
    let number;
    if (chainName == "evmos" || chainName == "sifchain") {
     number =  new Intl.NumberFormat('en-US').format(Math.round(val[chainName].tokens / Math.pow(10,18)))
      
    } else {
      number = new Intl.NumberFormat('en-US').format(Math.round(val[chainName].tokens / Math.pow(10,6)))
    }
   validatorStore.validators[validatorStore.validators.findIndex(v => v.chain == chainName)].votingPower = number  
  })
  evmosValidator.value = await validatorFetcher.getEvmosValidator();
  junoValidator.value = await validatorFetcher.getJunoValidator();
  currentVP.value = Math.round(evmosValidator.value.tokens / Math.pow(10,18));
  goalVP.value = Math.ceil(parseFloat(evmosValidator.value.tokens *1.2 / Math.pow(10,18))/1000) *1000;
  percentLeft.value = parseFloat(1- (currentVP.value / goalVP.value)).toFixed(2);
  progressLoading.value = false;
})
</script>

<template>
  <v-app class="app" full-height>
    <v-container>
      <HeadingRow />
      <v-row class="d-flex justify-center">
        <v-col md="8" sm="12">
          <v-card class="checker-form" color="white" elevation="8">
            <EligibilityCardHeader/>
            <EligibilityForm v-if="!submitted"/>
            <EligibilityResult v-else/>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col md="8" sm="12">
          <v-card class="checker-form mt-10" flat>
            <h2 class="px-4">How to support us?</h2>
            <v-divider />
            <ValidatorList :loading="progressLoading" :validators="validators" />
          </v-card>
        </v-col>
      </v-row>

      <Footer/>
    </v-container>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Poppins:ital,wght@0,900;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;700&display=swap');

.v-card {
  border-radius: 16px !important;
}

body {
  font-family: 'Josefin Sans', sans-serif;
}


.v-btn {
  border-radius: 8px !important;
}

.checker-form,
.v-footer {
  margin: 0 auto;
}
</style>