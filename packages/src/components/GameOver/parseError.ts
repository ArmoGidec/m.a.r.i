import { Errors } from '@core';

type CoreErrors = typeof Errors;
type CoreErrorNames = keyof CoreErrors;
type CoreError = CoreErrors[CoreErrorNames];

const ERROR_MAPPER: Record<CoreErrorNames, (error: InstanceType<CoreError>) => string> = {
  OutsideMapError: () => 'The bot is outside of map!',
};

export const parseError = (error: Error) => {
  return ERROR_MAPPER[error.name as CoreErrorNames]?.(error) ?? error.message;
};
