<script setup>
import { onMounted, onBeforeMount } from 'vue'
import {  Validator } from "./utils/Client"
import {useLoaderStore, useValidatorStore } from "./store"
import {storeToRefs} from "pinia"
import HeadingRow from "./components/HeadingRow.vue"
import ValidatorList from "./components/ValidatorList.vue"
import EligibilityForm from "./components/EligibilityForm.vue"
import EligibilityResult from "./components/EligibilityResult.vue"
import EligibilityCardHeader from "./components/EligibilityCardHeader.vue"
import Footer from "./components/Footer.vue"
import Countdown from './components/Countdown.vue'

const loaderStore = useLoaderStore();
const validatorStore = useValidatorStore();
const {currentVP, goalVP, percentLeft, progressLoading,keplr, chains,  submitted, cosmosValidator, junoValidator} = storeToRefs(loaderStore);

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
  junoValidator.value = await validatorFetcher.getJunoValidator();
  cosmosValidator.value = await validatorFetcher.getCosmosValidator();
  currentVP.value = Math.round(junoValidator.value.tokens / Math.pow(10,6));
  goalVP.value = Math.ceil(parseFloat(junoValidator.value.tokens *1.2 / Math.pow(10,6))/1000) *1000;
  percentLeft.value = parseFloat(1- (currentVP.value / goalVP.value)).toFixed(2);
  progressLoading.value = false;
})
</script>

<template>
  <v-app class="app" full-heigth>
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
            <ValidatorList :validators="validators" />
          </v-card>
        </v-col>
      </v-row>

      <Footer/>
    </v-container>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Poppins:ital,wght@0,900;1,900&display=swap');

.app {
  height: 100vh;
  overflow-y: scroll;
}

.v-card {
  border-radius: 16px !important;
}

* {
  font-family: 'Inconsolata', monospace;
}

.title,
.title * {
  font-family: 'Poppins', sans-serif;
}

.v-btn {
  border-radius: 8px !important;
}

.checker-form,
.v-footer {
  margin: 0 auto;
}
</style>