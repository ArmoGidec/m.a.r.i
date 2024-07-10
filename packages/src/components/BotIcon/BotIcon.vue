<template>
  <div class="bot-icon">
    <RobotIcon class="bot-icon__icon" />
  </div>
</template>

<script setup lang="ts">
import RobotIcon from '@app/assets/images/robot-icon.svg?component';
import { useRotate } from '@app/shared';
import { computed } from 'vue';

import type { BotIconProps } from './types';

const props = defineProps<BotIconProps>();

const position = computed(() => props.bot.position);

const { rotation } = useRotate(() => props.bot.direction);
</script>

<style lang="scss">
.bot-icon {
  color: #990f0f;
  width: var(--tile-size);
  height: var(--tile-size);

  display: flex;
  justify-content: center;
  align-items: center;

  rotate: calc(v-bind(rotation) * 1deg);

  position: absolute;
  --x-position: calc(
    var(--tile-size) * max(0, (v-bind('position.x') - 1))
  );
  --y-position: calc(
    var(--tile-size) * max(0, v-bind('position.y') - 1)
  );
  top: var(--y-position, 0);
  left: var(--x-position, 0);

  transition: .3s;

  &__icon {
    --size: calc(var(--tile-size) / 4 * 3);
    width: var(--size);
    height: var(--size);
  }
}
</style>
