<script setup>
import {useLoaderStore } from "../store"
import {storeToRefs} from "pinia"

const loaderStore = useLoaderStore();
const { loading, error,  eligible, double, address, submitted, manual} = storeToRefs(loaderStore);


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
       
       <template v-else>
              <v-card-title>Eligibility</v-card-title>
              <v-card-text>
                <v-progress-circular indeterminate v-if="loading && !error"></v-progress-circular>
                <v-alert v-if="error" type="error">The public RPC server is having some troubles. Please try again.</v-alert>
                <div v-if="!loading && !error">
                  <div v-if="eligible && !double">
                    <div class="text-body-1">You are eligible for the 50 JUNO giveaway on chain. <br> Make sure to
                      respect the other conditions mentionned in the <a target="__blank__"
                        href="https://twitter.com/stakefrites_/status/1526253044723228673">Tweet</a></div>
                    <div class="text-body-1 my-5">Would you love to get 100 JUNO instead of 50?</div>
                    <div class="text-body-2">Delegate 5 ATOM to Stake Frites </div>
                    <div class="mt-5">
                      <v-btn
                        target="__blank__"
                        href="https://wallet.keplr.app/#/cosmoshub/stake?modal=stake&validator=cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">
                        Delegate on KEPLR</v-btn>
                      <v-btn flat color="primary" class="ml-3"
                      target="__blank__"
                        href="https://restake.app/cosmoshub/cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">
                        Delegate on Restake</v-btn>
                    </div>
                  </div>
                  <div v-if="eligible && double">
                    <div class="text-body-1">You are eligible for the 100 JUNO giveaway on chain. <br> Make sure to
                      respect the other conditions mentionned in the <a target="__blank__"
                        href="https://twitter.com/stakefrites_/status/1526253044723228673">Tweet</a></div>
                  </div>
                  <div v-if="!eligible && !double">
                    <div class="text-body-1">Sorry fren, keep cooking to be eligible for the 50 JUNO giveaway. <br> You need to delegate at least
                      5 JUNO to Stake Frites 🥩 🍟 </div>
                    <div class="mt-5">
                      <v-btn
                      target="__blank__"
                        href="https://wallet.keplr.app/#/juno/stake?chainId=juno-1&modal=stake&validator=junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu">
                        Delegate on KEPLR</v-btn>
                      <v-btn flat color="primary" class="ml-3"
                      target="__blank__"
                        href="https://restake.app/juno/junovaloper1uepjmgfuk6rnd0djsglu88w7d0t49lml7kqufu">Delegate on
                        Restake</v-btn>
                    </div>
                    <div class="text-body-1 my-5">Would you love to get <strong>100 JUNO</strong> instead of 50?</div>
                    <div class="text-body-2">Delegate 5 ATOM to Stake Frites </div>
                    <div class="mt-5">
                      <v-btn
                      target="__blank__"
                        href="https://wallet.keplr.app/#/cosmoshub/stake?modal=stake&validator=cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">
                        Delegate on KEPLR</v-btn>
                      <v-btn flat color="primary" class="ml-3"
                      target="__blank__"
                        href="https://restake.app/cosmoshub/cosmosvaloper1uepjmgfuk6rnd0djsglu88w7d0t49lmljdpae2">
                        Delegate on Restake</v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="reset">Check again</v-btn>
              </v-card-actions>
            </template>