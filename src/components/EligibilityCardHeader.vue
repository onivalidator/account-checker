<script setup>
import {useLoaderStore } from "../store"
import {storeToRefs} from "pinia"

const loaderStore = useLoaderStore();
const {  percentLeft, currentVP, goalVP} = storeToRefs(loaderStore);

</script>

<template>
 <v-img src="https://res.cloudinary.com/la-tranchee/image/upload/v1652820778/steak_ut3pfq.png"
              max-width="100%">
              <div class="bottom-gradient"></div>
              <div v-if="!progressLoading" style="z-index:2; position: absolute; bottom:10px; left:0px; right:0px; color:#fff"
                class="px-4 goal">
                <b>{{currentVP}} JUNO</b>out of the {{goalVP}} goal (only {{percentLeft * 100}}% left!)
                <v-progress-linear rounded color="white" height="8" :modelValue="(100 - percentLeft* 100)" stream></v-progress-linear>
              </div>
            </v-img>
</template>

<style scoped>
.goal {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: .9;
}

.goal b {
  font-size: 1.5em;
  padding-right: 12px;
}

.bottom-gradient {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgb(0, 0, 0);
  background: linear-gradient(00deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

.v-progress-linear__determinate {
  border-radius:100px!important;
}


</style>