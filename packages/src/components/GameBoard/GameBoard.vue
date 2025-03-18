<template>
  <div class="game-board">
    <SquareTile
      v-for="tile in flatMap"
      :key="tile.key"
      v-bind="tile.props"
    />
  </div>
</template>

<script lang="ts" setup>
import { SquareTile, type SquareTileProps } from '@app/components/SquareTile';
import type { Position } from '@core';
import { computed } from 'vue';

import type { GameBoardProps } from './types';

const props = defineProps<GameBoardProps>();

const isStartPosition = (
  startPosition: Position,
  tilePosition: Position,
) => {
  const isTrue = startPosition.y === tilePosition.y
    && startPosition.x === tilePosition.x;
  
  return isTrue;
};

const flatMap = computed(() => {
  const { level } = props;
  const { startPosition } = level;

  return level.map.map(
    (row, y) => {
      y += 1;
      
      return row.map(
        (square, x) => {
          x += 1;
          
          const props: SquareTileProps = isStartPosition(
            startPosition.position, { x, y },
          )
            ? { type: 'start', direction: startPosition.direction }
            : { type: square };
          
          return {
            key: `${level.id}_${y}_${x}`,
            props,
          };
        },
      );
    }).flat();
});
</script>

<style lang="scss">
.game-board {
  display: grid;
  grid-template-columns: repeat(5, var(--tile-size));
}
</style>
