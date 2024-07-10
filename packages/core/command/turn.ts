import type { BotPosition } from '../bot';
import { Direction } from '../direction';
import { Command } from './command';

type TurnChangesMap = Record<Direction, Direction>;

abstract class Turn extends Command {
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
export class TurnLeft extends Turn {
  name = 'turnLeft';
  
  protected turnChangesMap = turnLeftChangesMap;
}

const turnRightChangesMap: TurnChangesMap = {
  [Direction.Up]: Direction.Right,
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
};

export class TurnRight extends Turn {
  name = 'turnRight';

  protected turnChangesMap = turnRightChangesMap;
}

abstract class TurnSwitch extends Turn {
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

export class TurnLeftSwitch extends TurnSwitch {
  name = 'turnLeftSwitch';

  protected turnChangesMap = turnLeftChangesMap;
}

export class TurnRightSwitch extends TurnSwitch {
  name = 'turnRightSwitch';

  protected turnChangesMap = turnRightChangesMap;
}
