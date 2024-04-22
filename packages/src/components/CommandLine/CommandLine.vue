<template>
  <div class="command-line">
    <CommandCard
      v-for="(command, idx) in commands"
      :key="`${command.name}_${idx}`"
      :command="command"
    />
  </div>
</template>

<script lang="ts" setup>
import { CommandCard } from '../CommandCard';
import type { CommandLineProps } from './types';

defineProps<CommandLineProps>();
</script>

<style lang="scss">
.command-line {
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: var(--magenta-haze);

  --size: calc(var(--tile-size) * 0.75);
  height: 72.5px;
}
</style>
