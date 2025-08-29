import type { Command } from './command';

export class CommandLine {
  readonly commands: Command[] = [];

  insertCommand(command: Command, idx: number) {
    this.commands.splice(idx, 0, command);
  }

  private _isStoped = false;
  get isStoped() {
    return this._isStoped;
  }

  stop() {
    this._isStoped = true;
  }

  async run(
    fn: (
      command: Command,
      index: number,
    ) => Promise<void> | void,
  ) {
    this._isStoped = false;

    for (let idx = 0, len = this.commands.length; idx < len; idx++) {
      const command = this.commands[idx];
      await fn(command, idx);

      if (this._isStoped) {
        return;
      }
    }
  }
}
