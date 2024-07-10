import { type BotPosition, type Command, Game, type Level } from '@core';
import { promiseTimeout } from '@vueuse/core';
import { reactive, readonly, watch } from 'vue';

export interface GameState {
  level: Level | null,
  game: Game | null,
  bot: BotPosition | null,
  possibleCommands: Command[],
  usedCommands: Command[],
  error: Error | null,
}

const state = reactive<GameState>({
  level: null,
  game: null,
  bot: null,
  possibleCommands: [],
  usedCommands: [],
  error: null,
});

const setLevel = (level: Level) => {
  state.level = level;
};

const reset = () => {
  updateGame();
};

const updateGame = () => {
  if (!state.level) {
    return;
  }

  state.error = null;

  state.game = new Game(state.level, {
    onError: handleError,
    onMove: updateGameData,
  });

  return updateGameData();
};

watch(() => state.level, () => {
  updateGame();
});

export const useGameStore = () => ({
  state: readonly(state) as Readonly<GameState>,
  setLevel,
  reset,
});

const handleError = (err: Error, bot: BotPosition) => {
  updateGameData();
  state.error = err;
  throw err;
};

const updateGameData = () => {
  const gameData = state.game!.data;
  
  state.bot = gameData.bot;
  state.possibleCommands = gameData.possibleCommands;
  state.usedCommands = gameData.usedCommands;
  return promiseTimeout(500);
};
