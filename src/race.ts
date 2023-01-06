import type { Size, Stats } from './types';

/**
 * @description The basic information about a Race
 *
 * @property {string} name The race's name
 * @property {number} speed Capacity of movement available for the race
 * @property {Size} size The average size of an specimen of the race
 * @property {Stas} extraStatsPoints The amount of extra points to stats that gives the race
 */
export interface IRace {
  readonly name: string;
  readonly speed: number;
  readonly size: Size;
  readonly extraStatsPoints: Stats;
}

/**
 * @classdesc Covers every modifier related to the character's race
 *
 * @abstract
 * @export
 */
export default abstract class Race implements IRace {
  public readonly name: string;
  public readonly speed: number;
  public readonly size: Size;
  public readonly extraStatsPoints: Stats = {};

  /**
   * Initialize the general values of the race
   * @param data A Race like object to get the values from
   */
  constructor(data: IRace) {
    this.name = data.name;
    if (data.speed < 0) throw new Error('The speed of the race cannot be negative');
    this.speed = data.speed;
    this.size = data.size;
    Object.assign(this.extraStatsPoints, data.extraStatsPoints);
  }
}