export const isDefined = <T>(raw: T | undefined | null): raw is T => 
  raw !== null && raw !== undefined;
