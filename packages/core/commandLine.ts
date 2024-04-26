import type { Command } from './command';

export class CommandLine {
  readonly commands: Command[] = [];

  insertCommand(command: Command, idx: number) {
    this.commands.splice(idx, 0, command);
  }

  async forEach(
    fn: (
      payload: { value: Command, index: number },
      stop: () => void,
    ) => Promise<void> | void,
  ) {
    let isStoped = false;

    const stop = () => {
      isStoped = true;
    };
    
    for (let idx = 0, len = this.commands.length; idx < len; idx++) {
      const command = this.commands[idx];
      await fn({
        value: command,
        index: idx,
      }, stop);

      if (isStoped) {
        return;
      }
    }
  }
}
