<template>
<div>
  <input :type="type" :value="modelValue" @input="setValue" />
</div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { inputProps } from './types'
export default defineComponent({
  name: 'c7-input',
  props: { ...inputProps, modelValue: {} },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const value = ref(null)
    const setValue = e => ctx.emit('update:modelValue', e?.target?.value)
    const type = computed(() => {
      return props.type
    })
    return {
      value,
      type,
      setValue
    }
  }
})
</script>