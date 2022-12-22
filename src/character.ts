/**
 * @classdesc Represent a D&D character
 *
 * @exports
 * @default
 */
export default class Character {
  public level: number = 1;

  /**
   * Create a new DnD character
   * @param name The name of the character
   */
  constructor(public readonly name: string) {
    this.name = name;
  }
}