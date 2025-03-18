<template>
  <component 
    :is="comp.is"
    v-bind="comp.props"
    class="square-tile"
  />
</template>

<script setup lang="ts">
import { Square } from '@core';
import { type Component, computed } from 'vue';

import { ClearTile, ExitTile, OutsideTile, StartTile } from './tiles';
import type { SquareTileProps } from './types';

const props = defineProps<SquareTileProps>();

const TYPE_MAPPER: Record<SquareTileProps['type'], Component> = {
  [Square.Clear]: ClearTile,
  [Square.Exit]: ExitTile,
  [Square.Outside]: OutsideTile,
  start: StartTile,
};

const comp = computed(() => ({
    is: TYPE_MAPPER[props.type],
    props: props.type === 'start'
      ? { direction: props.direction }
      : {},
  }));
</script>

<style lang="scss">
.square-tile {
  width: var(--tile-size);
  height: var(--tile-size);

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
