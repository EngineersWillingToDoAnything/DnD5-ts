import Race from '../race';

import { lucky, brave, nimble } from './race_abilities';

/**
 * @classdesc Represents a race with the Halfling attributes
 *
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
      abilities: {
        lucky,
        brave,
        nimble
      }
    });
  }
}