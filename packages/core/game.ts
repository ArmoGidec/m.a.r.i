import { Level } from './level';
import { Bot } from './bot';
import { Square } from './square';
import { Command } from './command';
import { CommandLine } from './commandLine';
import { Validation } from './validation';
import { OutsideMapError } from './error';

export class Game {
  private usedCommands = new WeakSet<Command>();
  
  constructor(
    private readonly level: Level,
    private readonly bot: Bot,
    private readonly commandLine: CommandLine,
  ) {
  }

  get possibleCommands() {
    return this.level.getCommands().filter((command) => !this.usedCommands.has(command));
  }

  pickCommand(command: Command, idx: number) {
    this.commandLine.insertCommand(command, idx);
    this.markCommand(command);
  }

  run() {
    this.commandLine.forEach((command, _, stop) => {
      const nextBot = command.move(this.bot);
      const [err] = this.validate(nextBot);

      if (err) {
        stop();
        return;
      }

      this.bot.direction = nextBot.direction;
      this.bot.position = nextBot.position;
    });
  }

  private validate(bot: Bot): Validation {
    const { x, y } = bot.position;
    const square = this.level.getSquare(x, y);
    if (square === Square.Outside) {
      return [new OutsideMapError(), null];
    }
    
    return [null, true];
  }

  private markCommand(command: Command) {
    this.usedCommands.add(command);
  }
}
