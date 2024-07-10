export type GameOverProps = {
  message: string,
};

export interface GameOverEmits {
  (event: 'reset'): void;
}
