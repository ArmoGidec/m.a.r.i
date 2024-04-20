import { Command } from './command';

export class Step implements Command {
  move(): void {
    throw new Error('Method not implemented.');
  }
}

export class DoubleStep implements Command {
  move(): void {
    throw new Error('Method not implemented.');
  }
}
