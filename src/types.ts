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
type Ethical = 'Lawful' | 'Neutral' | 'Chaotic';

/**
 * The moral alignment of a character
 */
type Moral = 'Good' | 'Neutral' | 'Evil';

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
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

/**
 * Things a character is good at
 *
 * @property {string[]} armor Armor that the character knows how to wear effectively
 * @property {string[]} weapons Weapons that the characters knows how to use effectively
 * @property {string[]} tools Tools that the character knows how to use effectively
 * @property {keyof Stats[]} savingThrows Things that the character is good at evading or resisting
 * @property {string[]} skills Skills that the character is good at
 *
 */
export interface Proficiencies {
  armor: string[];
  weapons: string[];
  tools: string[];
  savingThrows: (keyof Stats)[];
  skills: string[];
}

/**
 * @enum {string} The possible sizes of a creature
 * @readonly
 */
const Sizes = {
  Tiny: 'Tiny',
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
  Huge: 'Huge',
  Gargantuan: 'Gargantuan',
} as const;

/**
 * A type version of the 'Sizes' used to make sure that the size is one of the
 * possible sizes.
 *
 * @memberof Sizes
 */
export type Size = typeof Sizes[keyof typeof Sizes];