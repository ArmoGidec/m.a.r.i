export type SuccessValidation = [null, boolean];

export type ErrorValidation = [Error, null];

export type Validation = SuccessValidation | ErrorValidation;
