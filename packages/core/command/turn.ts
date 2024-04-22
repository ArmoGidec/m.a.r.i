import type { BotPosition } from '../bot';
import { Direction } from '../direction';
import type { Command } from './command';

type TurnChangesMap = {
  [P in Direction]: Direction;
};

abstract class Turn implements Command {
  abstract name: string;

  protected abstract turnChangesMap: TurnChangesMap;
  
  move(bot: BotPosition): BotPosition {
    return {
      ...bot,
      direction: this.turnChangesMap[bot.direction],
    };
  }
}

const turnLeftChangesMap: TurnChangesMap = {
  [Direction.Up]: Direction.Left,
  [Direction.Right]: Direction.Up,
  [Direction.Down]: Direction.Right,
  [Direction.Left]: Direction.Down,
};
export class TurnLeft extends Turn implements Command {
  name = 'turnLeft';
  
  protected turnChangesMap = turnLeftChangesMap;
}

const turnRightChangesMap: TurnChangesMap = {
  [Direction.Up]: Direction.Right,
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
};

export class TurnRight extends Turn implements Command {
  name = 'turnRight';

  protected turnChangesMap = turnRightChangesMap;
}

abstract class TurnSwitch extends Turn implements Command {
  move(bot: BotPosition): BotPosition {
    const nextBot = super.move(bot);
    this.switch();
    return nextBot;
  }

  private switch() {
    if (this.turnChangesMap === turnLeftChangesMap) {
      this.turnChangesMap = turnRightChangesMap;
      return;
    }

    this.turnChangesMap = turnLeftChangesMap;
  }
}

export class TurnLeftSwitch extends TurnSwitch implements Command {
  name = 'turnLeftSwitch';

  protected turnChangesMap = turnLeftChangesMap;
}

export class TurnRightSwitch extends TurnSwitch implements Command {
  name = 'turnRightSwitch';

  protected turnChangesMap = turnRightChangesMap;
}
