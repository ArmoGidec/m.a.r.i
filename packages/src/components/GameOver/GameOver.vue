<template>
  <div class="game-over">
    <div class="game-over__container">
      <span class="game-over__title">Game Over!</span>

      <span class="game-over__msg">
        {{ errorMessage }}
      </span>
      
      <ResetButton @reset="onReset()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ResetButton } from '@app/components/ResetButton';
import { computed } from 'vue';

import { parseError } from './parseError';
import type { GameOverEmits, GameOverProps } from './types';

const props = defineProps<GameOverProps>();

const emit = defineEmits<GameOverEmits>();

const errorMessage = computed(() => parseError(props.error));

const onReset = () => {
  emit('reset');
};
</script>

<style lang="scss">
.game-over {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba($color: #444444, $alpha: 0.4);

  &,
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__container {
    flex-direction: column;
    gap: 13px;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
  }

  
  &__title {
    font-weight: bold;
    font-size: 22px;
  }
}
</style>
