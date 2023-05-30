import Race from '../race';

import { darkVision, gnomeCunning } from './race_abilities';

/** @classdesc Represents a race with the Gnome attributes. */
export default class Gnome extends Race {
  /** @desc Pass the values to the parent constructor that constitutes a Gnome. */
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
      }
    });
  }
}