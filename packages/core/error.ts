export class OutsideMapError extends Error {
  name = 'OutsideMapError';
  
  constructor(public readonly payload?: any) {
    super(
      ['Bot is outside of map.', JSON.stringify(payload)].filter(Boolean).join(' '),
    );
  }
}
