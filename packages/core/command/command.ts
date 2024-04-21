import type { BotPosition } from '../bot';

export interface Command {
  move(bot: BotPosition): BotPosition;
}
