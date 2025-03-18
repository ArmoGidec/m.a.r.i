import { Direction } from '@core';
import { type MaybeRefOrGetter,toValue } from '@vueuse/core';
import { readonly, ref, watch } from 'vue';

const DIRECTION_MAPPER = {
  [Direction.Down]: 0,
  [Direction.Left]: 90,
  [Direction.Right]: 270,
  [Direction.Up]: 180,
} as const;

type RotationValue = typeof DIRECTION_MAPPER[keyof typeof DIRECTION_MAPPER];

export const getRotate = (direction: Direction): RotationValue => DIRECTION_MAPPER[direction];

export const useRotate = (source: MaybeRefOrGetter<Direction>) => {
  const rotation = ref(getRotate(toValue(source)));
  
  watch(() => toValue(source), (curDir, prevDir) => {
    let diff = getRotate(curDir) - getRotate(prevDir);    

    if (Math.abs(diff) > 90) {
      diff += Math.sign(-diff) * 360;
    }
    
    rotation.value += diff;
  });
  
  return {
    rotation: readonly(rotation),
  };
};
