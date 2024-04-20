import { Command } from './command';

export class Stop implements Command {
  move(): void {
    throw new Error('Method not implemented.');
  }
}
