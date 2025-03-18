<template>
  <div 
    v-loading="loading"
    class="app"
    :class="{
      'app--with-animations': withAnimations,
    }"
  >
    <template v-if="level && game">
      <GameBoard :level="level" />
      
      <hr class="app__delimiter" />
      
      <CommandLine 
        type="in"
        :commands="usedCommands"
        @insert="onInsert($event)"
      />

      <hr class="app__delimiter" />
      
      <CommandLine
        type="out"
        :commands="possibleCommands"
      />
      
      <BotIcon :bot="bot!" />
    </template>

    <ResetButton 
      class="app__reset-btn"
      @reset="onReset()"
    />
    
    <GameOver
      v-if="error?.show"
      :error="error.payload"
      @reset="onReset()"
    />
  </div>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core';
import { nextTick, ref, toRaw, toRefs, watch } from 'vue';

import { BotIcon } from './components/BotIcon';
import { CommandLine, type DragPayload } from './components/CommandLine';
import { GameBoard } from './components/GameBoard';
import { GameOver } from './components/GameOver';
import { ResetButton } from './components/ResetButton';
import { LevelsService } from './services';
import { useGameStore } from './shared';

const currentLevel = ref(8);
const gameStore = useGameStore();
const loading = ref(false);
const withAnimations = ref(true);

const disableAnimations = () => {
  withAnimations.value = false;
  return;
};

const enableAnimations = async () => {
  await promiseTimeout(300);
  withAnimations.value = true;
};

const fetchLevel = async () => {
  disableAnimations();

  loading.value = true;

  try {
    const level = await LevelsService.getLevel(currentLevel.value);
    gameStore.setLevel(level);
  } finally {
    loading.value = false;
    nextTick(enableAnimations);
  }
};

const onInsert = (payload: DragPayload) => {
  const game = toRaw(gameStore.state.game!);
  const command = toRaw(game.data.possibleCommands[payload.oldIndex]);

  game.pickCommand(command, payload.newIndex);
  game.run();
};

const onReset = () => {
  gameStore.reset();
  disableAnimations();

  nextTick(enableAnimations);
};

watch(currentLevel, () => {
  fetchLevel();
}, {
  immediate: true,
});

const { 
  bot,
  game,
  level,
  possibleCommands,
  usedCommands,
  error,
} = toRefs(gameStore.state);
</script>

<style lang="scss">
.app {
  background-color: #fff;
  font-family: Arial, Helvetica, sans-serif;

  --tile-size: 70px;
  position: relative;

  &__delimiter {
    margin: 0;
  }

  &__reset-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
