import { Bot } from '../bot';
import { Direction } from '../direction';
import { Command } from './command';

type TurnChangesMap = {
  [P in Direction]: Direction;
};

class Turn implements Command {
  protected turnChangesMap: TurnChangesMap;
  
  move(bot: Bot): Bot {
    return {
      ...bot,
      direction: turnLeftChangesMap[bot.direction],
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
  protected turnChangesMap = turnLeftChangesMap;
}

const turnRightChangesMap: TurnChangesMap = {
  [Direction.Up]: Direction.Right,
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
};

export class TurnRight extends Turn implements Command {
  protected turnChangesMap = turnRightChangesMap;
}

class TurnSwitch extends Turn implements Command {
  move(bot: Bot): Bot {
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
  protected turnChangesMap = turnLeftChangesMap;
}

export class TurnRightSwitch extends TurnSwitch implements Command {
  protected turnChangesMap = turnRightChangesMap;
}
