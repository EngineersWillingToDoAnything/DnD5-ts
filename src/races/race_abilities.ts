import { Ability } from '../types';

/** The character can see in the dim light. */
export const darkVision: Ability = {
  description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.'  
};

/** The character knows how to speak another language. */
export const extraLanguage: Ability = {
  description: 'You can speak, read, and write Common and one extra language of your choice.'
};

/** Allows the character to resist fire damage. */
export const hellishResistance: Ability = {
  description: 'You have resistance to fire damage.'
};

/** Allows the character to reroll 1s. */
export const lucky: Ability = {
  description: 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die. You must use the new result, even if it is a 1.'
};

/** Makes the character have a pair of balls. */
export const brave: Ability = {
  description: 'You have advantage on saving throws against being frightened.'
};

/** Allows the character to move through bigger creatures. */
export const nimble: Ability = {
  description: 'You can move through the space of any creature that is of a size larger than yours.'
};

/** Gives the character advantage on saves against magic. */
export const gnomeCunning: Ability = {
  description: 'You have advantage on all Intelligence, Wisdom, and Charisma saves against magic.'
};

/** Allows the character to have breath attack based on its draconic ancestry. */
export const breathWeapon: Ability = {
  description: 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.'
};

/** Allows the character to resist damage from the associated damage type. */
export const damageResistance: Ability = {
  description: 'You have resistance to the damage type associated with your draconic ancestry.'
};
