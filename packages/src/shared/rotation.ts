import { Direction } from '@core';
import { type MaybeRefOrGetter,toValue } from '@vueuse/core';
import { computed } from 'vue';

const DIRECTION_MAPPER = {
  [Direction.Down]: 0,
  [Direction.Left]: 90,
  [Direction.Right]: -90,
  [Direction.Up]: 180,
} as const;

type RotationValue = typeof DIRECTION_MAPPER[keyof typeof DIRECTION_MAPPER];

export const getRotate = (direction: Direction): `${RotationValue}deg` =>
  `${DIRECTION_MAPPER[direction]}deg`;

export const useRotate = (source: MaybeRefOrGetter<Direction>) => ({
  rotation: computed(() => getRotate(toValue(source))),
});
