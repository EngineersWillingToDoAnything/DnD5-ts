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
 * @desc Six Abilities that provides a quick description of every creature's
 *   physical and mental characteristics.
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

/** @desc Things a character is good at. */
export interface Proficiencies {
  /** Armor that the character knows how to wear effectively. */
  armor: string[];
  /** Weapons that the characters knows how to use effectively. */
  weapons: string[];
  /** Tools that the character knows how to use effectively. */
  tools: string[];
  /** Things that the character is good at evading or resisting. */
  savingThrows: (keyof Stats)[];
  /** Skills that the character is good at. */
  skills: string[];
}

/** @desc The possible sizes of a creature. */
const Sizes = {
  Tiny: 'Tiny',
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
  Huge: 'Huge',
  Gargantuan: 'Gargantuan',
} as const;

/**
 * @desc A type version of the 'Sizes' used to make sure that the size is one
 *   of the possible sizes.
 *
 * @memberof Sizes
 */
export type Size = typeof Sizes[keyof typeof Sizes];

/** @desc An active or passive skill of a creature. */
export interface Ability {
  /** A description of the ability. */
  description: string;
}

/**
 * @desc A collection of abilities.
 *    The key is the name of the ability and the value is the ability itself.
 *
 * @example
 * ```ts
 * {
 *  'Flying': {
 *    description: 'The creature can fly'
 * }
 * ```
 */
export type Abilities = Record<string, Ability>;