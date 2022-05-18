<script setup>
defineProps({
  validators: {
      type: Array
  }
})

</script>

<template>
    <v-row>
        <v-col v-for="validator in validators">
            <v-card>
                <v-card-title>TITLE</v-card-title>
                <v-card-text>
                    <div class="text-body-1">Voting Power</div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>