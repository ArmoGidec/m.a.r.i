import { type BotPosition, type Command, Game, type Level, type Position } from '@core';
import { promiseTimeout } from '@vueuse/core';
import { reactive, readonly, watch } from 'vue';

export interface GameState {
  level: Level | null,
  game: Game | null,
  bot: BotPosition | null,
  possibleCommands: Command[],
  usedCommands: Command[],
  error: {
    payload: Error,
    show: boolean,
  } | null,
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

const checkError = () => {
  setTimeout(() => {
    if (state.error) {
      state.error.show = true;
    }
  }, 600);
};

const updateGame = () => {
  if (!state.level) {
    return;
  }

  state.error = null;

  state.game = new Game(state.level, {
    onError: handleError,
    onMove: updateGameData,
    onUpdate: checkError,
  });

  return updateGameData();
};

watch(() => state.level, () => {
  updateGame();
});

const getSquare = (position: Position) => state.level?.getSquare(
  position.x,
  position.y,
);

export const useGameStore = () => ({
  state: readonly(state) as Readonly<GameState>,
  setLevel,
  reset,
  getSquare,
});

const handleError = (err: Error, bot: BotPosition) => {
  updateGameData();
  state.bot = bot;
  state.error = {
    payload: err,
    show: false,
  };
  throw err;
};

const updateGameData = () => {
  const gameData = state.game!.data;
  
  state.bot = gameData.bot;
  state.possibleCommands = gameData.possibleCommands;
  state.usedCommands = gameData.usedCommands;
  return promiseTimeout(300);
};
