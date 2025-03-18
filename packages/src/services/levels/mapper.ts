import { 
  type Command,
  Commands,
  Direction,
  Square,
} from '@core';

import type { RawCommand, RawDirection, RawMapItem } from './types';

export const RAW_MAP_ITEM_MAPPER: Record<RawMapItem, Square> = {
  clear: Square.Clear,
  exit: Square.Exit,
  outside: Square.Outside,
};

export const RAW_COMMAND_MAPPER: Record<RawCommand, Command> = {
  step: new Commands.Step(),
  doubleStep: new Commands.DoubleStep(),
  turnLeft: new Commands.TurnLeft(),
  turnRight: new Commands.TurnRight,
  turnLeftSwitch: new Commands.TurnLeftSwitch(),
  turnRightSwitch: new Commands.TurnRightSwitch(),
  wait: new Commands.Wait(),
  stop: new Commands.Stop(),
  repeat: new Commands.Repeat(),
};

export const RAW_DIRECTION_MAPPER: Record<RawDirection, Direction> = {
  up: Direction.Up,
  right: Direction.Right,
  down: Direction.Down,
  left: Direction.Left,
};
