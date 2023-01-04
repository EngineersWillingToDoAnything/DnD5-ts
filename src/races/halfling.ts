import Race from '../race';

/**
 * @classdesc Represents a race with the Halfling attributes
 *
 * @extends Race
 * @export
 * @default
 */
export default class Halfling extends Race {
  /**
   * Pass the values to the parent constructor that constitutes a Halfling
   */
  constructor() {
    super({
      name: 'Halfling',
      speed: 25,
      size: 'Small',
      extraStatsPoints: {
        dexterity: 2
      },
    });
  }
}
