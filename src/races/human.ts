import Race from '../race';

/**
 * @classdesc Represents a race with the human attributes
 *
 * @extends Race
 * @export
 * @default
 */
export default class Human extends Race {
  /**
   * Pass the values to the parent constructor that constitutes a human
   */
  constructor() {
    super({
      name: 'Human',
      speed: 30,
      size: 'Medium',
      extraStatsPoints: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      },
    });
  }
}
