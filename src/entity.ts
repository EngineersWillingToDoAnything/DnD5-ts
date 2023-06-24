import { CreatureType, Size } from './enums';
import type { Alignment, Attributes, Stats, Proficiencies, Language } from './types'

/** @desc Define the properties an entity must have. */
export interface EntityProperties {
  /** The name of the entity. */
  name: string;
  /** The ideology of the entity. */
  alignment: Alignment;
  /** Proficiencies of the entity */
  proficiencies: Proficiencies;
  /** The languages that the character knows */
}

/** @classdesc General class to represent any type of entity on the DnD world. */
export default class Entity implements EntityProperties {
  public name: string;
  public creatureType: CreatureType = CreatureType.Humanoid;
  public alignment: Alignment;
  public speed: number = 0;
  /** The size of the entity (commonly given by the race). */
  public size: Size = Size.Medium;
  /** How much health points the entity has. */
  public currentHP: number = 0;
  public proficiencyBonus: number = 0;
  /** The languages that the entities knows. */
  public languages: Language[] = ['Common'];
  /** The stats of the entity. */
  public stats: Stats = {
    maxHP: 0,
    armorClass: 0,
    initiative: 0,
    passivePerception: 0,
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0,
    },
    savingThrows: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    }
  }
  /** The things that the entity is good at. */
  public proficiencies: Proficiencies = {
    armor: [],
    weapons: [],
    tools: [],
    savingThrows: [],
    skills: []
  }

  /**
   * @desc Assign the entity properties plus the armor class, attributes and maxHP
   *   to the entity.
   *
   * @param data - The data to create the entity.
   */
  constructor(data: Partial<EntityProperties> & Pick<EntityProperties, 'name' | 'alignment'>) {
    this.name = data.name;
    this.alignment = data.alignment;
    if (data.proficiencies) this.proficiencies = data.proficiencies;
  }

  // ------------------------------------------------ Setters Section ------------------------------------------------ //

  /**
   * @desc Assign the max HP to the entity.
   *
   * @param maxHP - The maximum health points the entity can have.
   * @param heal - If the entity should be healed to the maximum health points.
   * @returns The entity itself.
   */
  public setMaxHP(maxHP: number, heal?: boolean): this {
    this.stats.maxHP = maxHP;
    if (heal) this.currentHP = maxHP;
    return this;
  }

  /**
   * @desc Assign the speed to the entity.
   *
   * @param speed - Speed of the entity.
   * @returns The entity itself.
   */
  public setSpeed(speed: number): this {
    this.speed = speed;
    return this;
  }

  /**
   * @desc Assign the armor class to the entity.
   *
   * @param armorClass - Armor class of the entity.
   * @returns The entity itself.
   */
  public setArmorClass(armorClass: number): this {
    this.stats.armorClass = armorClass;
    return this;
  }

  /**
   * @desc Assign the size to the entity.
   *
   * @param size - Size of the entity.
   * @returns The entity itself.
   */
  public setSize(size: Size): this {
    this.size = size;
    return this;
  }

  /**
   * @desc Assign the proficiency bonus.
   *
   * @param proficiencyBonus - The new proficiency bonus of the entity.
   * @returns The entity itself.
   */
  public setProficiencyBonus(proficiencyBonus: number): this {
    this.proficiencyBonus = proficiencyBonus;
    return this;
  }

  /**
   * @desc Assign the attributes to the entity.
   *
   * @param attributes - The attributes of the entity.
   * @returns The entity itself.
   */
  public setAttributes(attributes: Partial<Attributes>): this {
    Object.assign(this.stats.attributes, attributes);
    return this;
  }

  // ------------------------------------------------ Health Section ------------------------------------------------ //

  /**
   * @desc Receive a certain amount of damage.
   *
   * @param damage - The amount of damage to take.
   */
  public takeDamage(damage: number): void {
    this.currentHP -= damage;
    if (this.currentHP < 0) this.currentHP = 0;
  }

  /** @desc Reset the health points to the maximum. */
  public resetHealth(): void {
    this.currentHP = this.stats.maxHP;
  }

  /**
   * @desc Heal the entity by a certain amount.
   *
   * @param healAmount - The amount of health to heal.
   */
  public heal(healAmount: number): void {
    this.currentHP += healAmount;
    if (this.currentHP > this.stats.maxHP) this.currentHP = this.stats.maxHP;
  }

  // ------------------------------------------------ Language Section ------------------------------------------------ //

  /**
   * @desc Tell if the character knows a certain language.
   *
   * @param language - The language to check.
   * @returns True if the character knows the language, false otherwise.
   */
  public knowsLanguage(language: Language): boolean {
    return this.languages.includes(language);
  }

  /**
   * @desc Add a language to the character.
   *
   * @param language - The language to learn.
   */
  public learnLanguage(language: Language): void {
    if (!this.knowsLanguage(language)) this.languages.push(language);
  }

  /**
   * @desc Remove a language from the character
   *
   * @param language - The language to forget.
   */
  public forgetLanguage(language: Language): void {
    if (this.knowsLanguage(language)) this.languages.splice(this.languages.indexOf(language), 1);
  }

  /** @desc Remove all languages from the character (except Common). */
  public forgetAllLanguages(): void {
    this.languages.length = 0;
    this.languages.push('Common');
  }
};