<template>
  <div 
    v-loading="loading"
    class="app"
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
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, toRefs, watch } from 'vue';

import { BotIcon } from './components/BotIcon';
import { CommandLine, type DragPayload } from './components/CommandLine';
import { GameBoard } from './components/GameBoard';
import { LevelsService } from './services';
import { useGameStore } from './shared/gameStore';

const currentLevel = ref(8);
const gameStore = useGameStore();
const loading = ref(false);

const fetchLevel = async () => {
  loading.value = true;
  try {
    const level = await LevelsService.getLevel(currentLevel.value);
    gameStore.setLevel(level);
  } finally {
    loading.value = false;
  }
};

const onInsert = (payload: DragPayload) => {
  const game = toRaw(gameStore.state.game!);
  const command = toRaw(game.data.possibleCommands[payload.oldIndex]);

  game.pickCommand(command, payload.newIndex);
  game.run();
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
} = toRefs(gameStore.state);
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
