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
 * The ethical alignment of a character
 */
export type Ethical = 'Lawful' | 'Neutral' | 'Chaotic';

/**
 * The moral alignment of a character
 */
export type Moral = 'Good' | 'Neutral' | 'Evil';

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
 * Six Abilities that provides a quick description of every creature's
 * physical and mental characteristics
 *
 * @property {number} strength Measuring physical power
 * @property {number} dexterity Measuring agility
 * @property {number} constitution Measuring endurance
 * @property {number} intelligence Measuring reasoning and memory
 * @property {number} wisdom Measuring Perception and Insight
 * @property {number} charisma Measuring force of Personality
 */
export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}