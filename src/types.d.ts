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
 * @desc Six Abilities that provides a quick description of every entity's
 *   physical and mental characteristics.
 */
export interface Attributes {
  /** Measuring physical power. */
  strength: number;
  /** Measuring agility. */
  dexterity: number;
  /** Measuring endurance. */
  constitution: number;
  /** Measuring reasoning and memory. */
  intelligence: number;
  /** Measuring Perception and Insight. */
  wisdom: number;
  /** Measuring force of Personality. */
  charisma: number;
}

/** @desc Attribute specific related skills of the entity. */
export interface Skills {
  /** How good the entity can perform an acrobatics. */
  acrobatics: number;
  /** How good is the relation the entity has with animals.*/
  animalHandling: number;
  /** How much does the entity knows about magic. */
  arcana: number;
  /** How athletic is the entity. */
  athletics: number;
  /** How good is the entity at lying. */
  deception: number;
  /** How much does the entity knows about history. */
  history: number;
  /** How good is the entity at reading people. */
  insight: number;
  /** How intimidating is the entity. */
  intimidation: number;
  /** How good is the entity investigating. */
  investigation: number;
  /** How much does the entity know about medicine. */
  medicine: number;
  /** How much does the entity know about nature. */
  nature: number;
  /** How good is the entity at perceiving. */
  perception: number;
  /** How well the entity can delight an audience performing art. */
  performance: number;
  /** How persuasive is the entity. */
  persuasion: number;
  /** How much does the entity know about religion */
  religion: number;
  /** How good is the entity at sleight of hand related abilities */
  sleightOfHand: number;
  /** How stealthy is the entity */
  stealth: number;
  /** How good is the entity at survive alone in nature  */
  survival: number;
}

/** @desc Every stat related value of the entity */
export interface Stats {
  /** General roll values of the entity */
  attributes: Attributes;
  /** General saving roll values of the entity */
  savingThrows: Attributes;
  /** Specific rolls values of the entity */
  skills: Skills;
  /** The maximum health points the entity can have */
  maxHP: number;
  /** How hard it is to hit an entity */
  armorClass: number;
  /** Chances of being first in a combat */
  initiative: number;
  /** Chances of seeing things passively */
  passivePerception: number;
}

/** @desc Define the types of each proficiency. */
interface ProficiencyTypes {
  /** Armor that the character knows how to wear effectively. */
  armor: string;
  /** Weapons that the characters knows how to use effectively. */
  weapons: string;
  /** Tools that the character knows how to use effectively. */
  tools: string;
  /** Things that the character is good at evading or resisting. */
  savingThrows: keyof Attributes;
  /** Skills that the character is good at. */
  skills: keyof Skills;
}

/** @desc Things a character is good at. */
export type Proficiencies = {
  [Key in keyof ProficiencyTypes]: ProficiencyTypes[Key][];
};

/** @desc The possible sizes of a creature. */
export enum Size {
  Tiny = 'Tiny',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Huge = 'Huge',
  Gargantuan = 'Gargantuan'
};

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

/** @desc All the possible kinds of creatures. */
export enum CreatureType {
  Aberration = 'Aberration',
  Beast = 'Beast',
  Celestial = 'Celestial',
  Construct = 'Construct',
  Dragon = 'Dragon',
  Elemental = 'Elemental',
  Fey = 'Fey',
  Fiend = 'Fiend',
  Giant = 'Giant',
  Humanoid = 'Humanoid',
  Monstrosity = 'Monstrosity',
  Ooze = 'Ooze',
  Plant = 'Plant',
  Undead = 'Undead'
};