export class OutsideMapError extends Error {
  constructor() {
    super('Bot is outside of map');
  }
}
