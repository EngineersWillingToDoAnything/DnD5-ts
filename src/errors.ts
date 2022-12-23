/**
 * @classdesc Error class for when a stat value is invalid (e.g. too high or too low)
 *
 * @extends Error
 * @export
 */
export class StatError extends Error {
  /**
   * @brief Call the Error constructor with the message and set the name of the error
   *
   * @param message The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'StatError';
  }
}