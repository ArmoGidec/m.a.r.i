<template>
  <div class="start-tile"></div>
</template>

<script setup lang="ts">
import { useRotate } from '@app/shared';
import { Direction } from '@core';

const props = defineProps<{
  direction: Direction,
}>();

const { rotation } = useRotate(() => props.direction);
</script>

<style lang="scss">
.start-tile {
  background-image: url('@app/assets/images/start-tile-img.png');
  transform: rotate(calc(v-bind(rotation) * 1deg));
}
</style>
