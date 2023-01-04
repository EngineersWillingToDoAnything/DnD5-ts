import Race from '../race';

/**
 * @classdesc Represents a race with the Gnome attributes
 *
 * @extends Race
 * @export
 * @default
 */
export default class Gnome extends Race {
  /**
   * Pass the values to the parent constructor that constitutes a Gnome
   */
  constructor() {
    super({
      name: 'Gnome',
      speed: 25,
      size: 'Small',
      extraStatsPoints: {
        intelligence: 2,
      },
    });
  }
}
