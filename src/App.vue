<script setup>
import  {ref, onMounted} from 'vue'
import {Account, Chains } from "./utils/Client"
let address = ref("");
let chains = ref([]);
let eligible = ref(false);
let loading = ref(false);
let error = ref(false);
let submitted = ref(false);
let double = ref(false);


onMounted(async ()=> {
let chainFetcher = new Chains(["juno", "cosmoshub"]);
await chainFetcher.init();
chains.value = chainFetcher.chains;
console.log(chains.value)

})


let handleSubmit = async (e) => {
  submitted.value = true;
  loading.value = true;
 let account = new Account(address.value, chains.value);
 let hasError = await account.init();
 if (hasError ) {
   error.value = true;
 }
  eligible.value = account.eligible;
  double.value = account.double;
  console.log(account.eligible, account.double)
 loading.value= false;

}

let reset = () => {
  address.value = "";
  eligible.value = false;
  double.value = false;
  submitted.value = false;
}

</script>

<template>
<v-app class="app" full-heigth >
  <v-container>
  <v-row>
    <v-col>
      <div class="main-heading">Stake Frites' 🥩 🍟 </div>
      <div class="second-heading">$JUNO giveaway checker</div>
    </v-col>
  </v-row>
  <v-row v-if="!submitted">
    <v-col>
      <v-card class="checker-form mt-15">
        <v-card-title>
          <div class="secondary-heading mt-5">Enter your address</div>
        </v-card-title>
        <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field type="text" v-model="address"  placeholder="Enter your address"> </v-text-field>
          <v-btn flat color="primary" type="submit"> Check</v-btn>
        </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row  v-if="submitted"> 
    <v-col>
      <v-card class="checker-form">
        <v-card-title>Eligibility</v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate v-if="loading && !error"></v-progress-circular>
          <v-alert v-if="error" type="error">An error occured with the servers. Please try again.</v-alert>
          <div v-if="!loading">
            <div v-if="eligible && !double">
              <div class="text-body-1">You are eligible for the 50 $JUNO giveaway </div>
               <div class="text-body-1 my-5">Would you love to get 100 $JUNO instead of 50?</div>
              <div class="text-body-2">Delegate 5 ATOM to Stake Frites </div>
              <div class="mt-5">
                <v-btn href="https://wallet.keplr.app/#/cosmoshub/stake?modal=stake&validator=cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">Delegate on KEPLR</v-btn>
                <v-btn flat color="primary" class="ml-3" href="https://restake.app/cosmoshub/cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">Delegate on Restake</v-btn>
              </div>
            </div>
            <div v-if="eligible && double">
              <div class="text-body-1">You are eligible for the 100 $JUNO giveaway</div>
            </div>
            <div v-if="!eligible && !double">
              <div class="text-body-1">You not eligible. <br> You need to delegate at least 5 $JUNO to Stake Frites 🥩 🍟  </div>
              <div class="mt-5">
                <v-btn href="https://wallet.keplr.app/#/juno/stake?chainId=juno-1&modal=stake&validator=junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu">Delegate on KEPLR</v-btn>
                <v-btn flat color="primary" class="ml-3" href="https://restake.app/juno/junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu">Delegate on Restake</v-btn>
              </div>
              <div class="text-body-1 my-5">Would you love to get 100 $JUNO instead of 50?</div>
              <div class="text-body-2">Delegate 5 ATOM to Stake Frites </div>
              <div class="mt-5">
                <v-btn href="https://wallet.keplr.app/#/cosmoshub/stake?modal=stake&validator=cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">Delegate on KEPLR</v-btn>
                <v-btn flat color="primary" class="ml-3" href="https://restake.app/cosmoshub/cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">Delegate on Restake</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="reset">Check again</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</v-app>
</template>

<style>
.main-heading {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}

.second-heading {
  font-size: 2.5rem;
  text-align: center;
}

.app {
  height: 100vh;
}

.checker-form {
  margin: 0 auto;
  max-width: 800px;
}
</style>
