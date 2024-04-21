import type { BotPosition } from './bot';
import type { Command } from './command';
import { CommandLine } from './commandLine';
import { OutsideMapError } from './error';
import { Level } from './level';
import { Square } from './square';
import type{ Validation } from './validation';

export class Game {
  private usedCommands = new WeakSet<Command>();
  private readonly bot: BotPosition;
  private readonly commandLine = new CommandLine();
  
  constructor(
    private readonly level: Level,
  ) {
    this.bot = {
      position: { ...level.startPosition.position },
      direction: level.startPosition.direction,
    };
  }

  get data() {
    return {
      possibleCommands: this.level.commands.filter(
        (command) => !this.usedCommands.has(command),
      ),
    };
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

  private validate(bot: BotPosition): Validation {
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
