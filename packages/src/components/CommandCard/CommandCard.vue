<template>
  <div class="command-card">
    <component
      :is="commandIcon"
      class="command-card__icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommandMap } from './mapper';
import type { CommandCardProps } from './types';

const props = defineProps<CommandCardProps>();
const { commandIcon } = useCommandMap(() => props.command);
</script>

<style lang="scss">
.command-card {
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--eminence);
  color: rgb(203, 199, 199);
  border-radius: 8px;

  &__icon {
    --icon-size: calc(var(--size) * 0.75);
    width: var(--icon-size);
    height: var(--icon-size);
  }
}
</style>
