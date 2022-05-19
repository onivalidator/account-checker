<script setup>
import {useLoaderStore } from "../store"
import {storeToRefs} from "pinia"
import { fromBech32 } from "@cosmjs/encoding";
import {  Account} from "../utils/Client"

const loaderStore = useLoaderStore();
const { loading,cosmosDelegation, error, keplr, address, eligible, submitted, double, manual,isFormValid,errorMessages, cosmoshubStaked, junoStaked} = storeToRefs(loaderStore);


let handleSubmit = async (e) => {
  submitted.value = true;
  loading.value = true;
  let account = new Account(address.value);
  let hasError = await account.init();
  if (hasError) {
    error.value = true;
  }
  cosmosDelegation.value = account.cosmoshub.delegated;
  eligible.value = account.eligible;
  double.value = account.double;
  loading.value = false;
  cosmoshubStaked.value = account.cosmoshub
  junoStaked.value = account.juno

}


let getKeplr = async () => {
  window.keplr.enable("juno-1");
  const key = await window.keplr.getKey("juno-1");
  manual.value = true;
  address.value = key.bech32Address;
  validateAddress(address.value)
}


function validateAddress(a) {
  try {
    fromBech32(a);
    errorMessages.value = ''
    isFormValid.value = true;
    return true;
  } catch (error) {
    errorMessages.value = 'Invalid address'
    isFormValid.value = false;
    return "Invalid address";
  }
}


let setManual = () => {
  manual.value = true;
}
</script>

<template v-if="!submitted">
    <v-card-title>
    <div class="mt-5">Hello fren! Let's verify your eligibility, shall we?</div>
    </v-card-title>
    <v-card-text>
    <div class="d-flex flex-column">
        <v-btn v-if="keplr" flat class="keplr-button mb-3" @click="getKeplr">Get Address From
        Keplr</v-btn>
        <v-btn @click="setManual" flat v-if="keplr">Enter address manually</v-btn>
    </div>
    <v-form class="mt-5" v-if="!keplr || manual" @submit.prevent="handleSubmit">
        <v-text-field @change="validateAddress(address)" :error-messages="errorMessages" type="text"
        v-model="address" label="Enter your address"> </v-text-field>
        <v-btn v-if="isFormValid" flat color="primary" type="submit"> Check</v-btn>
    </v-form>
    </v-card-text>
</template>


<style scoped>

.keplr-button {
  color: white !important;
  font-weight: bold;
  background: rgb(163,93,247);
  background: linear-gradient(325deg, rgba(163,93,247,1) 0%, rgba(107,190,249,1) 75%, rgba(110,194,253,1) 100%);
}

</style>