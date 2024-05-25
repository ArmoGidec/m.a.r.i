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

    <GameOver
      v-if="error"
      message="The bot is outside!"
      @reset="onReset()"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, toRaw, toRefs, watch } from 'vue';

import { BotIcon } from './components/BotIcon';
import { CommandLine, type DragPayload } from './components/CommandLine';
import { GameBoard } from './components/GameBoard';
import { LevelsService } from './services';
import { useGameStore } from './shared/gameStore';
import { GameOver } from './components/GameOver';

const currentLevel = ref(8);
const gameStore = useGameStore();
const loading = ref(false);
const withAnimations = ref(true);

const fetchLevel = async () => {
  withAnimations.value = false;
  loading.value = true;
  try {
    const level = await LevelsService.getLevel(currentLevel.value);
    gameStore.setLevel(level);
  } finally {
    loading.value = false;
    withAnimations.value = true;
  }
};

const onInsert = (payload: DragPayload) => {
  const game = toRaw(gameStore.state.game!);
  const command = toRaw(game.data.possibleCommands[payload.oldIndex]);

  game.pickCommand(command, payload.newIndex);
  game.run();
};

const onReset = () => {
  withAnimations.value = false;
  gameStore.reset();

  nextTick(() => {
    withAnimations.value = true;
  });
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
}
</style>
