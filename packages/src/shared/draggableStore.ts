import { reactive, readonly } from 'vue';

const state = reactive({
  isDragging: false,
});

const startDragging = () => {
  state.isDragging = true;
};

const stopDragging = () => {
  state.isDragging = false;
};

export const useDraggableStore = () => ({
  state: readonly(state),
  startDragging,
  stopDragging,
});
