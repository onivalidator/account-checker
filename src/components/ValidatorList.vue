<script setup>
defineProps({
  validators: {
      type: Array
  }
})
</script>

<template>
    <v-list>
        <v-list-subheader class="mb-5">
            At Stake Frites, we are huge believers of decentralization.<br>
            We are also a bunch of entrepreneurs, and developpers trying to give our all to the community. <br>
            Consider delegating with us on KEPLR or Restake to help us to grow.
        </v-list-subheader>
        <v-list-item target="__blank__" lines="three" v-for="validator in validators"
            :href="validator.isNomic ? `https://app.nomic.io/` : validator.restake ? `https://restake.app/${validator.chain}/${validator.validator}` : `https://wallet.keplr.app/#/${validator.chain}/stake?modal=stake&validator=${validator.validator}`">
            <v-list-item-header>
                <v-list-item-title>
                    <div class="text-h6">{{ validator.name }}</div>
                </v-list-item-title>
                <v-list-item-subtitle><strong>Commission:</strong> {{ validator.commission }}</v-list-item-subtitle>
            </v-list-item-header>
        </v-list-item>
    </v-list>
</template>