import type { Size, Stats, Abilities } from './types';

/** @desc The basic information about a Race. */
export interface IRace {
  /** The race's name */
  readonly name: string;
  /** Capacity of movement available for the race */
  readonly speed: number;
  /** The average size of an specimen of the race */
  readonly size: Size;
  /** The amount of extra points to stats that gives the race */
  readonly extraStatsPoints: Stats;
  /** The actives and passives of the race */
  readonly abilities?: Abilities;
}

/** @classdesc Covers every modifier related to the character's race. */
export default abstract class Race implements IRace {
  public readonly name: string;
  public readonly speed: number;
  public readonly size: Size;
  public readonly extraStatsPoints: Stats = {};
  public readonly abilities: Abilities = {};

  /**
   * @desc Initialize the general values of the race.
   *
   * @param data - A Race like object to get the values from
   */
  constructor(data: IRace) {
    this.name = data.name;
    if (data.speed < 0) throw new Error('The speed of the race cannot be negative');
    this.speed = data.speed;
    this.size = data.size;
    Object.assign(this.extraStatsPoints, data.extraStatsPoints);
    Object.assign(this.abilities, data.abilities);
  }
}