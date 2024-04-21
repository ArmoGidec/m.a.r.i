import type { BotPosition } from '../bot';
import type { Command } from './command';

export class Wait implements Command {
  move(bot: BotPosition): BotPosition {
    return {
      ...bot,
    };
  }
}
