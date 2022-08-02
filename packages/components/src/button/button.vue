<template>
  <button>
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { buttonProps } from './types'
export default defineComponent({
  name: 'c7-button',
  props: buttonProps,
  setup(props) {
    const style = []
  }
})
</script>