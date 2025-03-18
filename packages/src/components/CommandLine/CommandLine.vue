<template>
  <div class="command-line" :class="{
    'command-line--in': type === 'in',
    'command-line--out': type === 'out',
    'command-line--dragging': draggableState.isDragging,
  }">
    <div ref="draggableContainerRef" class="command-line__draggable-container">
      <CommandCard 
        v-for="(command, idx) in commands"
        :key="`${command.name}_${idx}`"
        :command="command"
        class="command-line__command-card"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggableStore } from '@app/shared';
import Sortable from 'sortablejs';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import { CommandCard } from '../CommandCard';
import type { CommandLineEmits, CommandLineProps } from './types';

const props = defineProps<CommandLineProps>();
const emit = defineEmits<CommandLineEmits>();

const isInType = computed(() => props.type === 'in');

const { state: draggableState, startDragging, stopDragging } = useDraggableStore();
const draggableContainerRef = ref<HTMLDivElement>();
let sortable: Sortable | null = null;

const initSortable = () => {
  if (!draggableContainerRef.value) {
    return;
  }

  if (sortable) {
    disposeSortable();
  }

  sortable = Sortable.create(draggableContainerRef.value, {
    group: {
      name: 'command-line',
      put: isInType.value,
      pull: !isInType.value,
    },
    filter: () => isInType.value,
    sort: isInType.value,
    draggable: '.command-line__command-card',
    onAdd(event) {
      emit('insert', {
        oldIndex: event.oldIndex!,
        newIndex: event.newIndex!,
      });
    },
    onStart: startDragging,
    onEnd: stopDragging,
    ghostClass: 'command-line__command-card--drag',
  });
};

const disposeSortable = () => {
  if (!sortable) {
    return;
  }

  sortable.destroy();
  sortable = null;
};

onMounted(() => {
  initSortable();
});

onBeforeUnmount(() => {
  disposeSortable();
});
</script>

<style lang="scss">
.command-line {
  padding: 5px;
  background-color: var(--magenta-haze);

  --size: calc(var(--tile-size) * 0.75);

  &__draggable-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 5px;
    height: 62.5px;
    border-radius: 8px;
  }

  &:not(&--in) &__command-card--drag {
    display: none;
  }


  &:is(&--in) &__command-card--drag {
    opacity: 0.4;
  }

  &--dragging:is(&--in) &__draggable-container {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
