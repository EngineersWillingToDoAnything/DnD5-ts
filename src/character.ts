import type { Alignment, HP, Language, Stats, Proficiencies, Size, Abilities } from "./types";
import StatError from "./errors/stat_error";
import type { IRace } from "./race";

/**
 * @description The stats of a character
 */
interface CharStats extends Stats {
  /** The number of points that can be assigned to the stats */
  assignablePoints: number;
}

/**
 * @description The basic information about a character
 */
export interface ICharacter {
  /** The name of the character */
  readonly name: string;

  /** The level of the character */
  level?: number;
  /** The health points of the character (max and current) */
  readonly healthPoints?: HP;
  /** The ideology of the character */
  readonly alignment?: Alignment;
  /** The stats of the character */
  readonly stats?: Stats;
  /** The languages that the character knows */
  readonly languages?: Language[];
  /** A race object alike */
  race?: IRace;

  // Will be assigned when selecting class, race, etc.
  /** The things that the character is good at */
  readonly proficiencies?: Proficiencies;
  /** Capacity of movement available (given by the race) */
  speed?: number;
  /** The size of the character (given by the race) */
  size?: Size;
  /** The actives and passives of the character */
  readonly abilities?: Abilities;
}

/**
 * @classdesc Represent a D&D character
 *
 * @export
 * @default
 */
export default class Character implements ICharacter {
  public level: number = 1;
  public readonly name: string = '';
  public readonly healthPoints: HP = { max: 3, current: 3 };
  public readonly alignment: Alignment = { ethical: 'Neutral', moral: 'Neutral' };
  public readonly languages: Language[] = ['Common'];
  public readonly stats: CharStats;
  public proficiencyBonus = 2;
  public readonly proficiencies: Proficiencies = {
    armor: [],
    weapons: [],
    tools: [],
    savingThrows: [],
    skills: [],
  };
  public speed: number = 0;
  public size: Size = 'Medium';
  public raceName: string = '';
  public readonly abilities: Abilities = {};

  /**
   * Create a new DnD character
   * @param data The possible information about the character
   */
  constructor(data: ICharacter) {
    this.name = data.name;
    if (data?.level) this.level = data.level;
    if (data?.healthPoints) this.healthPoints = data.healthPoints;
    if (data?.alignment) this.alignment = data.alignment;
    if (data?.languages) {
      for (const lang of data.languages) this.learnLanguage(lang);
    }

    this.stats = {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
      assignablePoints: 27,
    }
    if (data?.stats) {
      for (const stat in data.stats) {
        this.removePointsFromStat(stat as keyof Stats, 8);
        this.addPointsToStat(stat as keyof Stats, data.stats[stat as keyof Stats] as number);
      }
    }
    if (data?.race) this.assignRace(data.race);
  }

  /**
   * @brief Receive a certain amount of damage
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

    const statValue = this.stats[stat] as number;
    if (this.level === 1) {
      if (statValue + points > 18) throw new StatError(1);
    } else {
      if (statValue + points > 20) throw new StatError(2);
    }

    this.stats[stat] = statValue + points;
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

    const statValue = this.stats[stat] as number;
    if (statValue - points < 0) throw new StatError(5);

    this.stats[stat] = statValue - points;
    this.stats.assignablePoints += points;
  }

  /**
   * @brief Add a proficiency to the character
   *
   * @param proficiencyType The type of the proficiency (armor, weapons, tools, savingThrows, skills)
   * @param proficiency The specific proficiency to add
   */
  public addProficiency <T extends keyof Proficiencies> (
    proficiencyType: T, proficiency: Proficiencies[T]) {
    this.proficiencies[proficiencyType].push(...proficiency);
  }

  /**
   * @brief Assign a race to the character
   *
   * @param race The race to get the values from
   */
  public assignRace (race: IRace): void {
    this.raceName = race.name;
    this.size = race.size;
    this.speed = race.speed;
    if (race.extraStatsPoints) {
      for (const stat in race.extraStatsPoints) {
        // In case it add points just like the constructor
        // this.addPointsToStat(stat as keyof Stats, race.extraStatsPoints[stat as keyof Stats] as number);

        // In case it adds points to the base stats
        const statValue = this.stats[stat as keyof Stats] as number;
        this.stats[stat as keyof Stats] = statValue + (race.extraStatsPoints[stat as keyof Stats] as number);
      }
    }
    Object.assign(this.abilities, race.abilities);
  }
}