import { 
  type BotPosition,
  type Command,
  Level,
  Square,
} from '@core';

import { 
  RAW_COMMAND_MAPPER,
  RAW_DIRECTION_MAPPER,
  RAW_MAP_ITEM_MAPPER,
} from './mapper';
import { 
  type RawCommand,
  type RawLevelData,
  type RawMapItem,
  type RawPosition,
} from './types';

const levelsPath = new URL('@app/assets/levels', import.meta.url).pathname;

export const getLevel = async (level: number): Promise<Level> => {
  const data: RawLevelData = await import(
    /* @vite-ignore */`${levelsPath}/${level}`,
  );
  return new Level(
    level,
    createMap(data.map),
    createCommands(data.commands),
    createStartPosition(data.startPosition),
  );
};

const createMap = (rawMap: RawMapItem[][]): Square[][] => {
  return rawMap.map((row) => row.map(
    (item: RawMapItem) => RAW_MAP_ITEM_MAPPER[item]),
  );
};

const createCommands = (rawCommands: RawCommand[]): Command[] => rawCommands
  .map((rawCommand) => RAW_COMMAND_MAPPER[rawCommand]);

const createStartPosition = (rawStartPosition: RawPosition): BotPosition => ({
  position: rawStartPosition.position,
  direction: RAW_DIRECTION_MAPPER[rawStartPosition.direction],
});
  
