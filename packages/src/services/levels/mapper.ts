import { 
  type Command,
  Direction,
  DoubleStep,
  Repeat,
  Square,
  Step,
  Stop,
  TurnLeft,
  TurnLeftSwitch,
  TurnRight,
  TurnRightSwitch,
  Wait,
} from '@core';

import type { RawCommand, RawDirection, RawMapItem } from './types';

export const RAW_MAP_ITEM_MAPPER: Record<RawMapItem, Square> = {
  clear: Square.Clear,
  exit: Square.Exit,
  outside: Square.Outside,
};

export const RAW_COMMAND_MAPPER: Record<RawCommand, Command> = {
  step: new Step(),
  doubleStep: new DoubleStep(),
  turnLeft: new TurnLeft(),
  turnRight: new TurnRight,
  turnLeftSwitch: new TurnLeftSwitch(),
  turnRightSwitch: new TurnRightSwitch(),
  wait: new Wait(),
  stop: new Stop(),
  repeat: new Repeat(),
};

export const RAW_DIRECTION_MAPPER: Record<RawDirection, Direction> = {
  up: Direction.Up,
  right: Direction.Right,
  down: Direction.Down,
  left: Direction.Left,
};
