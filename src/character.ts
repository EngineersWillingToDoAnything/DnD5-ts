/**
 * @classdesc Represent a D&D character
 *
 * @export
 * @default
 */
export default class Character {
  public level: number = 1;
  public healthPoints: number = 3;

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
    this.healthPoints -= damage;
    if (this.healthPoints < 0) this.healthPoints = 0;
  }

  /**
   * @brief Reset the health points to the maximum
   */
  public resetHealth() {
    this.healthPoints = 3;
  }

  /**
   * @brief Heal the character by a certain amount
   *
   * @param healAmount The amount of health to heal
   */
  public heal(healAmount: number) {
    this.healthPoints += healAmount;
    if (this.healthPoints > 3) this.healthPoints = 3;
  }
}