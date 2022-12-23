import type { Alignment, HP, Language, Stats } from "./types";
import { StatError } from "./errors";

/**
 * @description The stats of a character
 * @property {number} assignablePoints The number of points that can be assigned to the stats
 *
 * @extends Stats
 */
interface CharStats extends Stats {
  assignablePoints: number;
}

/**
 * @classdesc Represent a D&D character
 *
 * @export
 * @default
 */
export default class Character {
  public level: number = 1;
  public readonly healthPoints: HP = { max: 3, current: 3 };
  public readonly alignment: Alignment = { ethical: 'Neutral', moral: 'Neutral' };
  private readonly languages: Language[] = ['Common'];
  public readonly stats: CharStats;

  /**
   * Create a new DnD character
   * @param name The name of the character
   */
  constructor(public readonly name: string) {
    this.name = name;
    this.stats = {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
      assignablePoints: 27,
    }
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

  /**
   * @brief Add a certain amount of points to a stat
   * @param stat The stat to add points to
   * @param points The amount of points to add
   */
  public addPointsToStat(stat: keyof Stats, points: number) {
    if (points < 0) throw new StatError(0);

    if (this.stats.assignablePoints < points) throw new StatError(3);

    if (this.level === 1) {
      if (this.stats[stat] + points > 18) throw new StatError(1);
    } else {
      if (this.stats[stat] + points > 20) throw new StatError(2);
    }

    this.stats[stat] += points;
    this.stats.assignablePoints -= points;
  }

  /**
   * @brief Reset all stats to 8
   */
  public resetStats() {
    for (const stat in this.stats) {
      if (stat !== 'assignablePoints') this.stats[stat as keyof Stats] = 8;
    }
    this.stats.assignablePoints = 27;
  }

  /**
   * @brief Remove a certain amount of points from a stat
   * @param stat The stat to remove points from
   * @param points The amount of points to remove
   */
  public removePointsFromStat(stat: keyof Stats, points: number) {
    if (points < 0) throw new StatError(4);

    if (this.stats[stat] - points < 0) throw new StatError(5);

    this.stats[stat] -= points;
    this.stats.assignablePoints += points;
  }
}