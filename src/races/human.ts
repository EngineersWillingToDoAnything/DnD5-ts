import Race from '../race';

import { extraLanguage } from './race_abilities';

/**
 * @classdesc Represents a race with the human attributes
 *
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
      abilities: {
        extraLanguage,
      },
    });
  }
}