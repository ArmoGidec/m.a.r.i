<template>
  <button 
    class="reset-btn"
    @click="emitReset()"
  >
    Reset
  </button>
</template>

<script setup lang="ts">
import type { ResetButtonEmits } from './types';

const emit = defineEmits<ResetButtonEmits>();

const emitReset = () => {
  emit('reset');
};
</script>

<style lang="scss">
.reset_btn {
    border: none;
    padding: 12px;
    border-radius: 8px;
    background-color: #154d88;
    color: white;
  }
</style>
