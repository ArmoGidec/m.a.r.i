import { Bot } from '../bot';

export interface Command {
  move(bot: Bot): Bot;
}
