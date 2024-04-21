<template>
  <div class="start-tile"></div>
</template>

<script setup lang="ts">
import { Direction } from '@core';
import { computed } from 'vue';

const DIRECTION_MAPPER: Record<Direction, number> = {
  [Direction.Down]: 0,
  [Direction.Left]: 90,
  [Direction.Right]: -90,
  [Direction.Up]: 180,
};

const props = defineProps<{
  direction: Direction,
}>();

const rotateValue = computed(() => `${DIRECTION_MAPPER[props.direction]}deg`);
</script>

<style lang="scss">
.start-tile {
  background-image: url('@app/assets/images/start-tile-img.png');
  transform: rotate(v-bind(rotateValue));
}
</style>
