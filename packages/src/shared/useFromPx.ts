import { fromPx } from '@shared';
import { 
  computed,
  type MaybeRefOrGetter,
  toValue,
} from 'vue';

export const useFromPx = (source: MaybeRefOrGetter<string>) => computed(
  () => fromPx(toValue(source), 70),
);
