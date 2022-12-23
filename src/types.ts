/**
 * The max and current health points of an entity
 *
 * @property {number} max The maximum health points the character can have
 * @property {number} current The current health points the character has
 */
export interface HP { max: number, current: number };

/**
 * All the languages available in the dnd world.
 */
export type Language = 'Common' | 'Elvish' | 'Dwarvish' | 'Infernal';

/**
 * The alignment of a character
 *
 * @property {Ethical} ethical The character's ethical alignment
 * @property {Moral} moral The character's moral alignment
 */
export interface Alignment {
  ethical: Ethical;
  moral: Moral;
}

/**
 * The ethical alignment of a character
 */
export type Ethical = 'Lawful' | 'Neutral' | 'Chaotic';

/**
 * The moral alignment of a character
 */
export type Moral = 'Good' | 'Neutral' | 'Evil';