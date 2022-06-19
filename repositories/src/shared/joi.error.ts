interface Context {
  [key: string]: any;
  key?: string;
  label?: string;
  value?: any;
}

interface ValidationErrorItem {
  message: string;
  path: Array<string | number>;
  type: string;
  context?: Context;
}

interface ValidationError extends Error {
  name: 'ValidationError';

  isJoi: boolean;

  /**
   * array of errors.
   */
  details: ValidationErrorItem[];

  /**
   * function that returns a string with an annotated version of the object pointing at the places where errors occurred.
   *
   * NOTE: This method does not exist in browser builds of Joi
   *
   * @param stripColors - if truthy, will strip the colors out of the output.
   */
  annotate(stripColors?: boolean): string;

  _original: any;
}

export { ValidationError }