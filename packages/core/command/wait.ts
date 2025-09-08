import type { BotPosition } from '../bot';
import { Command } from './command';

export class Wait extends Command {
  name = 'wait';
  
  exec(bot: BotPosition): BotPosition {
    return { ...bot };
  }
}
