import type { BotPosition } from '../bot';
import { Command } from './command';

export class Stop extends Command {
  name = 'stop';
  
  exec(bot: BotPosition): BotPosition {
    return { ...bot };
  }
}
