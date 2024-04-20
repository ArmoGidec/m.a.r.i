import { Command } from './command';

export class CommandLine {
  private readonly commands: Command[] = [];

  insertCommand(command: Command, idx: number) {
    this.commands.splice(idx, 0, command);
  }

  forEach(fn: (value: Command, index: number, stop: () => void) => void) {
    let isStoped = false;

    const stop = () => {
      isStoped = true;
    };
    
    for (let idx = 0, len = this.commands.length; idx < len; idx++) {
      const command = this.commands[idx];
      fn(command, idx, stop);

      if (isStoped) {
        return;
      }
    }
  }
}
