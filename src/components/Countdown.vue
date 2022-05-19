<script setup>
import moment from "moment";
import {onBeforeMount, ref } from 'vue';
const days = ref("");
const hours = ref("");
const minutes = ref("");
const seconds = ref("");

onBeforeMount(()=> {
    const now = new moment();
    const end = moment.utc("2022-05-30");

    const diff = moment.duration(end.diff(now))
    days.value = diff.days();
    hours.value = diff.hours();
    minutes.value = diff.minutes();
    seconds.value = diff.seconds();
})

setInterval(()=>{
    const now = new moment();
    const end = moment.utc("2022-05-30");

    const diff = moment.duration(end.diff(now))
    days.value = diff.days();
    hours.value = diff.hours();
    minutes.value = diff.minutes();
    seconds.value = diff.seconds();
}, 1000);

</script>

<template>
    <v-row class="d-flex justify-center">
        <v-col cols="8" sm="6" >
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
    </v-row>
</template>