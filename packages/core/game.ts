import type { BotPosition } from './bot';
import type { Command } from './command';
import { CommandLine } from './commandLine';
import { OutsideMapError } from './error';
import { Level } from './level';
import { Square } from './square';
import type{ Validation } from './validation';

export interface GameOptions {
  onUpdate?: () => void,
  onError?: (err: Error, bot: BotPosition) => void,
  onMove?: () => Promise<void> | void,
}

export class Game {
  private usedCommands: Record<Command['id'], boolean> =  {};
  private bot: BotPosition;
  private readonly commandLine = new CommandLine();
  private readonly options: GameOptions = {};
  
  constructor(
    private readonly level: Level,
    options?: GameOptions,
  ) {
    this.bot = {
      position: { ...level.startPosition.position },
      direction: level.startPosition.direction,
    };

    this.options = { ...options };
  }

  get data() {
    const possibleCommands = this.level.commands.filter(
      (command) => !this.usedCommands[command.id],
    );
    
    return {
      bot: {
        direction: this.bot.direction,
        position: {
          ...this.bot.position,
        },
      },
      usedCommands: [...this.commandLine.commands],
      possibleCommands,
    };
  }

  pickCommand(command: Command, idx: number) {
    this.commandLine.insertCommand(command, idx);
    this.markCommand(command);
  }

  run() {
    this.commandLine.forEach(async ({ value: command }, stop) => {
      const nextBot = command.move(this.bot);      
      const [err] = this.validate(nextBot);

      if (err) {
        stop();
        this.options?.onError?.(err, nextBot);
      }

      this.bot = nextBot;
      await this.options.onMove?.();
    }).finally(() => {
      this.options.onUpdate?.();
    });
  }

  private validate(bot: BotPosition): Validation {
    const { x, y } = bot.position;
    const square = this.level.getSquare(x, y);
    if (square === Square.Outside) {
      return [new OutsideMapError(bot), null];
    }
    
    return [null, true];
  }

  private markCommand(command: Command) {
    this.usedCommands[command.id] = true;
  }
}
