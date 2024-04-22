import type { BotPosition } from '../bot';

export interface Command {
  name: string;
  move(bot: BotPosition): BotPosition;
}
