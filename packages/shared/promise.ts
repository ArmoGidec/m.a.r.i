interface WithResolversOut<T> {
  promise: Promise<T>,

  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export const withResolvers = <T>(): WithResolversOut<T> => {
  let _resolve;
  let _reject;

  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  
  return { 
    promise,
    resolve: _resolve!,
    reject: _reject!,
  };
};
