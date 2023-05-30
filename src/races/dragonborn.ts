import Race from '../race';

import { breathWeapon, damageResistance } from './race_abilities';

/** @classdesc Represents a race with the Dragonborn attributes. */
export default class Dragonborn extends Race {
  /**
   * @desc Pass the values to the parent constructor that constitutes a
   *   Dragonborn.
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
      abilities: {
        breathWeapon,
        damageResistance,
      }
    });
  }
}