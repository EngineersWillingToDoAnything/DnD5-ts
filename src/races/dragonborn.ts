import Race from '../race';

/**
 * @classdesc Represents a race with the Dragonborn attributes
 *
 * @extends Race
 * @export
 * @default
 */
export default class Dragonborn extends Race {
  /**
   * Pass the values to the parent constructor that constitutes a Dragonborn
   */
  constructor() {
    super({
      name: 'Dragonborn',
      speed: 30,
      size: 'Medium',
      extraStatsPoints: {
        strength: 2,
        charisma: 1,
      },
    });
  }
}
