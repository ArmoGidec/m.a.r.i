<template>
  <div 
    v-loading
    class="app"
  >
    <GameBoard 
      v-if="level"
      :level="level"
    />
  </div>
</template>

<script setup lang="ts">
import { Game } from '@core';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import { GameBoard } from './components/GameBoard';
import { LevelsService } from './services';

const currentLevel = ref(1);

const levelState = useAsyncState(
  () => LevelsService.getLevel(currentLevel.value),
  null,
);

const level = computed(() => levelState.state.value);
const game = computed(() => {
  if (!level.value) {
    return null;
  }
  
  return new Game(level.value);
});

watch(currentLevel, () => {
  levelState.execute();
});
</script>

<style>
.app {
  background-color: #fff;

  --tile-size: 70px;
}
</style>
