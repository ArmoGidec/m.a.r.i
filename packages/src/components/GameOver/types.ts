export type GameOverProps = {
  error: Error,
};

export interface GameOverEmits {
  (event: 'reset'): void;
}
