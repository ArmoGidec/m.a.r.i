<template>
  <div class="bot-icon">
    <RobotIcon class="bot-icon__icon" />
  </div>
</template>

<script setup lang="ts">
import RobotIcon from '@app/assets/images/robot-icon.svg?component';
import { useRotate } from '@app/shared';

import type { BotIconProps } from './types';

const props = defineProps<BotIconProps>();
const { rotation } = useRotate(() => {
  return props.bot.direction;
});
</script>

<style lang="scss">
.bot-icon {
  color: #990f0f;
  width: var(--tile-size);
  height: var(--tile-size);

  display: flex;
  justify-content: center;
  align-items: center;

  rotate: v-bind(rotation);

  position: absolute;
  --x-position: calc(
    var(--tile-size) * max(0, (v-bind('props.bot.position.x') - 1))
  );
  --y-position: calc(
    var(--tile-size) * max(0, v-bind('props.bot.position.y') - 1)
  );
  top: var(--y-position, 0);
  left: var(--x-position, 0);

  &__icon {
    --size: calc(var(--tile-size) / 4 * 3);
    width: var(--size);
    height: var(--size);
  }
}

.app--with-animations .bot {
  transition: .3s;
}
</style>
