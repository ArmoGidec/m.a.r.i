import { isDefined } from './is';

export const fromPx = (value: string, defaultValue?: number) => {
  const result = +value.replace('px', '');
  return isNaN(result) && isDefined(defaultValue) ? defaultValue : result;
};
