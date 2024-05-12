import { Direction, Turn } from '@core';
import { type MaybeRefOrGetter,toValue } from '@vueuse/core';
import { computed } from 'vue';

const DIRECTION_MAPPER = {
  [Direction.Down]: 0,
  [Direction.Left]: 90,
  [Direction.Right]: 270,
  [Direction.Up]: 180,
} as const;

type RotationValue = typeof DIRECTION_MAPPER[keyof typeof DIRECTION_MAPPER];

export const getRotationValue = (direction: Direction): RotationValue => DIRECTION_MAPPER[direction];

export const useRotate = (source: MaybeRefOrGetter<Direction>) => {
  const directionInfo = computed<[Direction | undefined, Direction]>((oldValue) => {
    const oldDirection = oldValue?.[1];
    const currentDirection = toValue(source);

    if (oldDirection === currentDirection) {
      return oldValue!;
    }
    
    return [oldDirection, currentDirection] as const;
  });
  
  const rotationValue = computed<number>((oldValue = 0) => {
    const [oldDirection, currentDirection] = toValue(directionInfo);
    if (!oldDirection) {
      return getRotationValue(currentDirection);
    }

    const diff = Turn.isTurnLeft(oldDirection, currentDirection) ? -90 : 90;
    return oldValue + diff;
  });
  
  return {
    rotation: computed(() => `${rotationValue.value}deg`),
  };
};
