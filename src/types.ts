/**
 * The max and current health points of an entity
 */
export interface HP {
  /** The maximum health points the character can have */
  max: number,
  /** The current health points the character has */
  current: number
};

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
 */
export interface Alignment {
  /** The character's ethical alignment */
  ethical: Ethical;
  /** The character's moral alignment */
  moral: Moral;
}

/**
 * Six Abilities that provides a quick description of every creature's
 * physical and mental characteristics
 */
export interface Stats {
  /** Measuring physical power */
  strength?: number;
  /** Measuring agility */
  dexterity?: number;
  /** Measuring endurance */
  constitution?: number;
  /** Measuring reasoning and memory */
  intelligence?: number;
  /** Measuring Perception and Insight */
  wisdom?: number;
  /** Measuring force of Personality */
  charisma?: number;
}

/**
 * Type of each proficiency
 *
 * @property {string} armor
 * @property {string} weapons
 * @property {string} tools
 * @property {keyof Stats} savingThrows
 * @property {string} skills
 */
interface ProficiencyTypes {
  armor: string;
  weapons: string;
  tools: string;
  savingThrows: keyof Stats;
  skills: string;
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
export type Proficiencies = {
  [Key in keyof ProficiencyTypes]: ProficiencyTypes[Key][];
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

/**
 * An active or passive skill of a creature.
 */
export interface Ability {
  /** A description of the ability. */
  description: string;
}

/**
 * A collection of abilities.
 *
 * @property {Ability} [key] The ability with the key as name.
 * @example
 * ```ts
 * {
 *  'Flying': {
 *    description: 'The creature can fly'
 * }
 * ```
 */
export type Abilities = {
  [key: string]: Ability;
}