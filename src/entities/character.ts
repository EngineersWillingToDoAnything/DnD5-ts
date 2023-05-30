import Entity from '../entity';
import StatError from '../errors/stat_error';
import type { EntityProperties } from '../entity';
import type { Proficiencies, Abilities, Attributes } from '../types';
import type { RaceProperties } from '../race';

/** @classdesc Represent a D&D character. */
export default class Character extends Entity {
  public level: number = 1;
  public raceName: string = '';
  public readonly abilities: Abilities = {};

  /**
   * @desc Create a new DnD character with the information provided
   *   (or the default values if none provided).
   *   - The stats will be initialized with 8 points each.
   *   - It will know Common.
   *   - It will have 27 points to assign to the stats.
   *   - It will have 3 health points.
   *
   * @param data - The possible information about the character.
   */
  constructor(data: EntityProperties & Record<'attributes', Attributes> &
    Partial<Pick<Character, 'level' | 'abilities'> & Record<'race', RaceProperties>>) {
    super({
      name: data.name,
      alignment: data.alignment,
      proficiencies: data.proficiencies
    });
    if (data?.level) this.level = data.level;
    if (data?.race) this.assignRace(data.race);
    if (data?.attributes) this.setAttributes(data.attributes);
  }

  /**
   * @desc Set the attributes of the character.
   *   The total amount of points spent cannot be higher than 75.
   *
   * @param attributes - The attributes to set.
   * @returns The character itself.
   */
  public override setAttributes(attributes: Attributes): this {
    const TOTAL_POINTS = 75;
    const values = Object.values(attributes);
    const pointsSpent = values.reduce((a, b) => a + b);
    if (pointsSpent > TOTAL_POINTS) throw new StatError(6); // TODO: CHANGE ERROR
    if (pointsSpent < TOTAL_POINTS) throw new StatError(7); // TODO: CHANGE ERROR
    if (values.some((value) => value < 1)) throw new StatError(0);
    if (values.some((value) => value > 18)) throw new StatError(1);
    return super.setAttributes(attributes);
  }

  /**
   * @desc Add a proficiency to the character
   *
   * @param proficiencyType - The type of the proficiency (armor, weapons, tools, savingThrows, skills).
   * @param proficiency - The specific proficiency to add.
   */
  public addProficiency <T extends keyof Proficiencies> (
    proficiencyType: T, proficiency: Proficiencies[T]): void {
      this.proficiencies[proficiencyType].push(...proficiency);
  }

  /**
   * @desc Assign a race to the character.
   *
   * @param race - The race to get the values from.
   */
  public assignRace (race: RaceProperties): void {
    this.raceName = race.name;
    this.size = race.size;
    this.speed = race.speed;
    if (race.extraAttributesPoints) {
      for (const attribute in race.extraAttributesPoints) {
        const currentAttribute = attribute as keyof Attributes;
        this.stats.attributes[currentAttribute] += race.extraAttributesPoints[currentAttribute] as number;
      }
    }
    Object.assign(this.abilities, race.abilities);
  }
};