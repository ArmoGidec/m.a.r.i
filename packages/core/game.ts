import type { BotPosition } from './bot';
import type { Command } from './command';
import { CommandLine } from './commandLine';
import { OutsideMapError } from './error';
import { Level } from './level';
import { Square } from './square';
import type { Validation } from './validation';

export interface GameOptions {
  onUpdate?: () => void,
  onError?: (err: Error, bot: BotPosition) => void,
  onMove?: () => Promise<void> | void,
}

export class Game {
  private usedCommands: Record<Command['id'], boolean> = {};
  private bot: BotPosition;
  private readonly commandLine = new CommandLine();
  private readonly options: GameOptions = {};
  private possibleCommands: Command[] = [];

  constructor(
    private readonly level: Level,
    options?: GameOptions,
  ) {
    this.bot = {
      position: { ...level.startPosition.position },
      direction: level.startPosition.direction,
    };
    this.possibleCommands = [...this.level.commands];

    this.options = { ...options };
  }

  get data() {
    return {
      bot: {
        direction: this.bot.direction,
        position: {
          ...this.bot.position,
        },
      },
      usedCommands: [...this.commandLine.commands],
      possibleCommands: [...this.possibleCommands],
    };
  }

  pickCommand(command: Command, idx: number) {
    this.commandLine.insertCommand(command, idx);

    this.markCommand(command);

    this.possibleCommands = this.level.commands.filter(
      (command) => !this.usedCommands[command.id],
    );
  }

  run() {
    let repeat = false;

    this.commandLine.run(async (command) => {
      if (command.name === 'repeat') {
        repeat = true;
        return;
      }

      await this.exec(command);

      if (repeat && !this.commandLine.isStoped) {
        await this.exec(command);
        repeat = false;
      }
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

  private async exec(command: Command) {
    const nextBot = command.exec(this.bot);
    const [err] = this.validate(nextBot);

    if (err) {
      this.commandLine.stop();
      this.options?.onError?.(err, nextBot);
    }

    this.bot = nextBot;
    await this.options.onMove?.();
  }
}
