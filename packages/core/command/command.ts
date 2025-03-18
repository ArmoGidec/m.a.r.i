import type { BotPosition } from '../bot';

let _id = 1;
const id = () => _id++;

export abstract class Command {
  id = id();
  abstract name: string;
  abstract move(bot: BotPosition): BotPosition;
}
