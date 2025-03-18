<template>
  <div class="bot-icon">
    <RobotIcon class="bot-icon__icon" />
  </div>
</template>

<script setup lang="ts">
import RobotIcon from '@app/assets/images/robot-icon.svg?component';
import { useRotate } from '@app/shared';
import { useGameStore } from '@app/shared/gameStore';
import { Square } from '@core';
import { ref, watch } from 'vue';

import { calcCollisionPosition } from './calcColision';
import type { BotIconProps } from './types';

const props = defineProps<BotIconProps>();

const gameStore = useGameStore();

const position = ref(props.bot.position);

watch(() => props.bot.position, () => {
  const nextPosition = props.bot.position;

  if (gameStore.getSquare(nextPosition) === Square.Clear) {
    position.value = nextPosition;
    return;
  }

  position.value = calcCollisionPosition(
    position.value,
    nextPosition,
  );
});

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
    var(--tile-size) * (v-bind('position.x') - 1)
  );
  --y-position: calc(
    var(--tile-size) * (v-bind('position.y') - 1)
  );
  top: var(--y-position, 0);
  left: var(--x-position, 0);

  &__icon {
    --size: calc(var(--tile-size) / 4 * 3);
    width: var(--size);
    height: var(--size);
  }
}

.app--with-animations .bot-icon {
  transition: .3s;
}
</style>
