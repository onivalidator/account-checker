<script setup>
defineProps({
  validators: {
      type: Array
  },
  loading: {
      type: Boolean
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
        <v-table density="compact">
            <thead>
                <tr>
                    <th>Network</th>
                    <th>Voting Power</th>
                    <th></th>
                    <th>Commission</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="validator in validators">
                    <td>{{validator.name}}</td>
                    <td v-if="!loading">{{validator.votingPower}}</td>
                    <td v-else><v-progress-circular  width="2" size="x-small" indeterminate></v-progress-circular></td>
                    <td>
                        <v-btn target="__blank__" size="x-small" flat color="primary" :href="validator.isNomic ? `https://app.nomic.io/` : validator.restake ? `https://restake.app/${validator.chain}/${validator.validator}` : `https://wallet.keplr.app/#/${validator.chain}/stake?modal=stake&validator=${validator.validator}`">Delegate</v-btn>
                    </td>
                    <td>{{validator.commission}}</td>

                    <td >{{validator.validator.slice(0,10)}}...{{validator.validator.slice(-10)}}</td>
                </tr>
            </tbody>
        </v-table>
    </v-list>
</template>