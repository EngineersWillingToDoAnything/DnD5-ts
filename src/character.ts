import type { HP, Language } from "./types";

/**
 * @classdesc Represent a D&D character
 *
 * @export
 * @default
 */
export default class Character {
  public level: number = 1;
  public readonly healthPoints: HP = { max: 3, current: 3 };
  private readonly languages: Language[] = ['Common'];

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

  /**
   * @brief Tell if the character knows a certain language
   *
   * @param language The language to check
   * @returns True if the character knows the language, false otherwise
   */
  public knowsLanguage(language: Language): boolean {
    return this.languages.includes(language);
  }

  /**
   * @brief Add a language to the character
   *
   * @param language The language to learn
   */
  public learnLanguage(language: Language) {
    if (!this.knowsLanguage(language)) this.languages.push(language);
  }

  /**
   * @brief Remove a language from the character
   * @param language The language to forget
   */
  public forgetLanguage(language: Language) {
    if (this.knowsLanguage(language)) this.languages.splice(this.languages.indexOf(language), 1);
  }

  /**
   * @brief Remove all languages from the character (except Common)
   */
  public forgetAllLanguages() {
    this.languages.splice(1);
  }

  /**
   * @brief Get the languages the character knows
   *
   * @returns The languages the character knows
   */
  public languagesKnown(): Language[] {
    return this.languages;
  }
}