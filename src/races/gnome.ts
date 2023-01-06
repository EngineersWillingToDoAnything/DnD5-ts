import Race from '../race';

import { darkVision, gnomeCunning } from './race_abilities';

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
      abilities: {
        darkVision,
        gnomeCunning,
      },
    });
  }
}
