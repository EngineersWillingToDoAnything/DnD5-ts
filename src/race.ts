import { Size } from './enums';
import type { Attributes, Abilities } from './types';

/** @desc The basic information about a Race. */
export interface RaceProperties {
  /** The race's name */
  readonly name: string;
  /** Capacity of movement available for the race */
  readonly speed: number;
  /** The average size of an specimen of the race */
  readonly size: Size;
  /** The amount of extra points to Attributes that gives the race */
  readonly extraAttributesPoints: Partial<Attributes>;
  /** The actives and passives of the race */
  readonly abilities?: Abilities;
}

/** @classdesc Covers every modifier related to the character's race. */
export default abstract class Race implements RaceProperties {
  public readonly name: string;
  public readonly speed: number;
  public readonly size: Size;
  public readonly extraAttributesPoints: Partial<Attributes> = {};
  public readonly abilities: Abilities = {};

  /**
   * @desc Initialize the general values of the race.
   *
   * @param data - A Race like object to get the values from
   */
  constructor(data: RaceProperties) {
    this.name = data.name;
    if (data.speed < 0) throw new Error('The speed of the race cannot be negative');
    this.speed = data.speed;
    this.size = data.size;
    Object.assign(this.extraAttributesPoints, data.extraAttributesPoints);
    Object.assign(this.abilities, data.abilities);
  }
}