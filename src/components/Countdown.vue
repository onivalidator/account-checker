<script setup>
import moment from "moment";
import {onBeforeMount, ref } from 'vue';
const days = ref("");
const hours = ref("");
const minutes = ref("");
const seconds = ref("");
const isDone = ref(false);
const endDate = moment.utc("2022-06-15");

onBeforeMount(()=> {
    const now = new moment();
    if (now > endDate) {
        isDone.value = true;
    } 


    const diff = moment.duration(endDate.diff(now))
    days.value = diff.days();
    hours.value = diff.hours();
    minutes.value = diff.minutes();
    seconds.value = diff.seconds();
})

setInterval(()=>{
    const now = new moment();

    const diff = moment.duration(endDate.diff(now))
    days.value = diff.days();
    hours.value = diff.hours();
    minutes.value = diff.minutes();
    seconds.value = diff.seconds();
}, 1000);

</script>

<template>
    <v-row class="d-flex justify-center pt-10">
        <v-col sm="12" md="6" v-if="!isDone">
            <div class="d-flex justify-space-between mb-2">
                <div class="d-flex flex-column align-center">
                    <div class="text-h5 mx-1">{{days}}</div>
                    <div>days</div>
                </div>
                <div class="d-flex flex-column align-center">
                    <div class="text-h5 mx-1">{{hours}}</div>
                    <div>hours</div>
                </div>
                <div class="d-flex flex-column align-center">
                    <div class="text-h5 mx-1">{{minutes}}</div>
                    <div>minutes</div>
                </div>
                <div class="d-flex flex-column align-center">
                    <div class="text-h5 mx-1">{{seconds}}</div>
                    <div>seconds</div>
                </div>
            </div>
        </v-col>
        <v-col v-else>
            <div>... Our scripts are currently finding a winner</div>
        </v-col>
    </v-row>
</template>