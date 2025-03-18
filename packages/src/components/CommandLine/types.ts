import type { Command } from '@core';

export interface CommandLineProps {
  commands: Command[],
  type: 'in' | 'out'
}

export interface DragPayload {
  newIndex: number,
  oldIndex: number,
}

export interface CommandLineEmits {
  (event: 'insert', payload: DragPayload): void;
}
