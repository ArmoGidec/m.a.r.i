export type RawDirection = 'up' | 'right' | 'down' | 'left';

export type RawMapItem = 
  'outside'
  | 'clear'
  | 'exit';

export type RawCommand = 
  'step'
  | 'doubleStep'
  | 'turnLeft'
  | 'turnRight'
  | 'turnLeftSwitch'
  | 'turnRightSwitch'
  | 'wait'
  | 'stop'
  | 'repeat';

export interface RawPosition {
  direction: RawDirection,
  position: {
    x: number,
    y: number,
  },
}

export interface RawLevelData {
  map: RawMapItem[][],
  commands: RawCommand[],
  startPosition: RawPosition,
}
