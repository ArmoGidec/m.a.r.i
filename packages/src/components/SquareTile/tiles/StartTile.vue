<template>
  <div class="start-tile"></div>
</template>

<script setup lang="ts">
import { getRotate } from '@app/shared';
import { Direction } from '@core';
import { computed } from 'vue';

const props = defineProps<{
  direction: Direction,
}>();

const rotateValue = computed(() => getRotate(props.direction));
</script>

<style lang="scss">
.start-tile {
  background-image: url('@app/assets/images/start-tile-img.png');
  transform: rotate(v-bind(rotateValue));
}
</style>
