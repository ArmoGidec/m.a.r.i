<template>
  <div class="game-over">
    <div class="game-over__container">
      <span class="game-over__title">Game Over!</span>

      <span class="game-over__msg">
        {{ message }}
      </span>
      
      <button 
        class="game-over__reset"
        @click="reset()"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverEmits, GameOverProps } from './types';

defineProps<GameOverProps>();

const emit = defineEmits<GameOverEmits>();

const reset = () => {
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

  &__reset {
    border: none;
    padding: 12px;
    border-radius: 8px;
    background-color: #154d88;
    color: white;
  }
}
</style>
