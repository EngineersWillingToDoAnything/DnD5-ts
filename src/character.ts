/**
 * @classdesc Represent a D&D character
 *
 * @exports
 * @default
 */
export default class Character {
  public readonly name: string;

  /**
   * Create a new DnD character
   * @param {string} name The name of the character
   */
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}