<script setup>
 import img from "../assets/stakefrites.png"
</script>

<template>
 <v-row class="d-flex justify-center">
    <v-col sm="12" md="8">
      <div class="d-flex justify-center">
        <img class="logo" :src="img"/>
        <div class="main-heading mt-5">GIVEAWAY<br>CHECKER</div>
      </div>
    </v-col>
  </v-row>
</template>

<style>

.logo{
  width: 100px;
  height: 100px;
}

.main-heading {
  font-size: 32px;
  font-weight: 700;
  color: #a71c1b;
  line-height: 1;
}

</style>