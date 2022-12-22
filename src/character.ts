import type { HP } from "./types";

/**
 * @classdesc Represent a D&D character
 *
 * @export
 * @default
 */
export default class Character {
  public level: number = 1;
  public readonly healthPoints: HP = { max: 3, current: 3 };

  /**
   * Create a new DnD character
   * @param name The name of the character
   */
  constructor(public readonly name: string) {
    this.name = name;
  }

  /**
   * @brief Recieve a certain amount of damage
   *
   * @param damage The amount of damage to take
   */
  public takeDamage(damage: number) {
    this.healthPoints.current -= damage;
    if (this.healthPoints.current < 0) this.healthPoints.current = 0;
  }

  /**
   * @brief Reset the health points to the maximum
   */
  public resetHealth() {
    this.healthPoints.current = this.healthPoints.max;
  }

  /**
   * @brief Heal the character by a certain amount
   *
   * @param healAmount The amount of health to heal
   */
  public heal(healAmount: number) {
    this.healthPoints.current += healAmount;
    if (this.healthPoints.current > this.healthPoints.max) this.healthPoints.current = this.healthPoints.max;
  }
}