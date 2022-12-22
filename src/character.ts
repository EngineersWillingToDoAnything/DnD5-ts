/**
 * @classdesc Represent a D&D character
 *
 * @exports
 * @default
 */
export default class Character {
  public readonly name: string;
  public level: number = 1;

  /**
   * Create a new DnD character
   * @param {string} name The name of the character
   */
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}