/**
 * @classdesc Error class for when a stat value is invalid (e.g. too high or too low)
 *
 * @extends Error
 * @export
 */
export default class StatError extends Error {
  /** All the possible messages */
  private static readonly messages: string[] = [
    'Cannot add negative points',
    'Cannot have a stat above 18 on level 1',
    'Cannot assign more than 20 points to any stat.',
    'Not enough assignable points',
    'Cannot remove negative points',
    'Cannot have a stat below 0',
  ];

  /**
   * @brief Call the Error constructor with the message and set the name of the error
   *
   * @param opcode The opcode of the message
   */
  constructor(opcode: number = -1) {
    if (opcode < 0 || opcode >= StatError.messages.length) super('Unknown stat error');
    else super(StatError.messages[opcode]);
    this.name = 'StatError';
  }

  /**
   * @brief Get the message associated with the opcode
   *
   * @param messageOpcode The opcode of the message
   * @returns The message of the error
   */
  public static getMessage(opcode: number): string {
    return StatError.messages[opcode];
  }
}