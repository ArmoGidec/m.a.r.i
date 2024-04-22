<template>
  <div 
    v-loading
    class="app"
  >
    <template v-if="level && game">
      <GameBoard :level="level" />
      
      <hr class="app__delimiter" />
      
      <CommandLine :commands="game.data.usedCommands" />

      <hr class="app__delimiter" />
      
      <CommandLine :commands="game.data.possibleCommands" />
      
      <BotIcon :bot="game.data.bot" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Game } from '@core';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import { BotIcon } from './components/BotIcon';
import { CommandLine } from './components/CommandLine';
import { GameBoard } from './components/GameBoard';
import { LevelsService } from './services';

const currentLevel = ref(8);

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

<style lang="scss">
.app {
  background-color: #fff;

  --tile-size: 70px;
  position: relative;

  &__delimiter {
    margin: 0;
  }
}
</style>
