import DoubleStepIcon from '@app/assets/images/command-icons/double-step-icon.svg?component';
import RepeatIcon from '@app/assets/images/command-icons/repeat-icon.svg?component';
import StepIcon from '@app/assets/images/command-icons/step-icon.svg?component';
import TurnLeftIcon from '@app/assets/images/command-icons/turn-left-icon.svg?component';
import TurnRightIcon from '@app/assets/images/command-icons/turn-right-icon.svg?component';
import WaitIcon from '@app/assets/images/command-icons/wait-icon.svg?component';
import { type Command, Commands } from '@core';
import { type Component, computed, type MaybeRefOrGetter,toValue } from 'vue';

type CommandNames = Uncapitalize<keyof typeof Commands>;

const NullComponent = { render: () => null };

export const COMMAND_MAPPER: Record<CommandNames, Component> = {
  step: StepIcon,
  doubleStep: DoubleStepIcon,
  turnLeft: TurnLeftIcon,
  turnRight: TurnRightIcon,
  repeat: RepeatIcon,
  wait: WaitIcon,

  stop: NullComponent,
  turnLeftSwitch: NullComponent,
  turnRightSwitch: NullComponent,
};

export const useCommandMap = (source: MaybeRefOrGetter<Command>) => {
  const commandIcon = computed(() => COMMAND_MAPPER[toValue(source).name as CommandNames]);

  return { commandIcon };
};
