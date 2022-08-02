<template>
<div>1</div>
<div>
  <c7-button size="">111</c7-button>
  <C7Input v-model="input" type="file"></C7Input>
</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { C7Button, C7Input } from 'c7oud-ui'
const input = ref(null)
watch(() => input.value, (cur, old) => {
  console.log(cur, old)
})
</script>