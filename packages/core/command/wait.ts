import type { BotPosition } from '../bot';
import { Command } from './command';

export class Wait extends Command {
  name = 'wait';
  
  move(bot: BotPosition): BotPosition {
    return { ...bot };
  }
}
