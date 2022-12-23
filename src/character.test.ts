import Character from './character';
import { StatError } from './errors';

let testCharacter: Character;
beforeAll (() => {
  testCharacter = new Character('John Doe');
});

beforeEach (() => {
  testCharacter.resetHealth();
  testCharacter.forgetAllLanguages();
  testCharacter.resetStats();
});


describe ('Character properties tests', () => {
  it ('Should have a name', () => {
    expect(testCharacter).toHaveProperty('name');
    expect(testCharacter.name).toBe('John Doe');
  });

  it ('Should start with level 1', () => {
    expect(testCharacter).toHaveProperty('level');
    expect(testCharacter.level).toBe(1);
  });

  it ('Should start with its max health points', () => {
    expect(testCharacter).toHaveProperty('healthPoints');
    expect(testCharacter.healthPoints.current).toBe(testCharacter.healthPoints.max);
  });

  it ('Know at least the "Common" language', () => {
    expect(testCharacter).toHaveProperty('languages');
    expect(testCharacter.knowsLanguage('Common')).toBe(true);
  });

  it ('Should not know any other language', () => {
    expect(testCharacter.knowsLanguage('Dwarvish')).toBe(false);
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    expect(testCharacter.knowsLanguage('Infernal')).toBe(false);
  });

  it ('Should have a true neutral alignment', () => {
    expect(testCharacter).toHaveProperty('alignment');
    expect(testCharacter.alignment.ethical).toBe('Neutral');
    expect(testCharacter.alignment.moral).toBe('Neutral');
  });

  it ('Should have the six basic stats', () => {
    expect(testCharacter).toHaveProperty('stats');
    expect(testCharacter.stats).toHaveProperty('strength');
    expect(testCharacter.stats).toHaveProperty('dexterity');
    expect(testCharacter.stats).toHaveProperty('constitution');
    expect(testCharacter.stats).toHaveProperty('intelligence');
    expect(testCharacter.stats).toHaveProperty('wisdom');
    expect(testCharacter.stats).toHaveProperty('charisma');
  });

  it ('Should have 8 as the base value for all stats', () => {
    expect(testCharacter.stats.strength).toBe(8);
    expect(testCharacter.stats.dexterity).toBe(8);
    expect(testCharacter.stats.constitution).toBe(8);
    expect(testCharacter.stats.intelligence).toBe(8);
    expect(testCharacter.stats.wisdom).toBe(8);
    expect(testCharacter.stats.charisma).toBe(8);
  });

  it ('Should have 27 assignable points', () => {
    expect(testCharacter.stats.assignablePoints).toBe(27);
  });
});


describe ('Character health system', () => {
  it ('Should be able to take damage', () => {
    testCharacter.takeDamage(1);
    expect(testCharacter.healthPoints.current).toBe(2);
  });

  it ('Should not be able to have negative health points', () => {
    testCharacter.takeDamage(10_000);
    expect(testCharacter.healthPoints.current).toBe(0);
  });

  it ('Should be able to reset health points', () => {
    testCharacter.takeDamage(1);
    testCharacter.resetHealth();
    expect(testCharacter.healthPoints.current).toBe(testCharacter.healthPoints.max);
  });

  it ('Should be able to heal', () => {
    testCharacter.takeDamage(2);
    testCharacter.heal(1);
    expect(testCharacter.healthPoints.current).toBe(2);
  });

  it ('Should not be able to heal over its max health points', () => {
    testCharacter.heal(10_000);
    expect(testCharacter.healthPoints.current).toBe(testCharacter.healthPoints.max);
  });
});


describe ('Character language system', () => {
  it ('Should tell if it knows a language', () => {
    expect(testCharacter.knowsLanguage('Common')).toBe(true);
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
  });

  it ('Should be able to learn a language', () => {
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    testCharacter.learnLanguage('Elvish');
    expect(testCharacter.knowsLanguage('Elvish')).toBe(true);
  });

  it ('Should not be able to learn a language twice', () => {
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    testCharacter.learnLanguage('Elvish');
    testCharacter.learnLanguage('Elvish');
    expect(testCharacter.languagesKnown()).toHaveLength(2); // Common + Elvish
  });

  it ('Should return the languages known', () => {
    expect(testCharacter.languagesKnown()).toHaveLength(1); // Common
    testCharacter.learnLanguage('Elvish');
    testCharacter.learnLanguage('Dwarvish');
    testCharacter.learnLanguage('Infernal');
    expect(testCharacter.languagesKnown()).toHaveLength(4); // Common + 3 new languages
  });

  it ('Should be able to forget a language', () => {
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    testCharacter.learnLanguage('Elvish');
    expect(testCharacter.knowsLanguage('Elvish')).toBe(true);
    testCharacter.forgetLanguage('Elvish');
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
  });

  it ('Should not be able to forget a language it does not know', () => {
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    testCharacter.forgetLanguage('Elvish');
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
  });

  it ('Should be able to forget all languages (except Common)', () => {
    testCharacter.learnLanguage('Elvish');
    testCharacter.learnLanguage('Dwarvish');
    testCharacter.learnLanguage('Infernal');
    expect(testCharacter.languagesKnown()).toHaveLength(4); // Common + 3 new languages
    testCharacter.forgetAllLanguages();
    expect(testCharacter.languagesKnown()).toHaveLength(1); // Common
  });
});

describe ('Character stats system', () => {
  it ('Should be able to add points to a stat', () => {
    testCharacter.addPointsToStat('strength', 1);
    expect(testCharacter.stats.strength).toBe(9);
    expect(testCharacter.stats.assignablePoints).toBe(26);
    testCharacter.addPointsToStat('wisdom', 4);
    expect(testCharacter.stats.wisdom).toBe(12);
    expect(testCharacter.stats.assignablePoints).toBe(22);
  });

  it ('Should not be able to add more points than available', () => {
    expect(() => testCharacter.addPointsToStat('strength', 100)).toThrow(StatError);
    expect(() => testCharacter.addPointsToStat('strength', 100)).toThrow(StatError.getMessage(3));
  });

  it ('Should not be able to add points to a stat that has reached its max value', () => {
    testCharacter.addPointsToStat('strength', 10);
    expect(() => testCharacter.addPointsToStat('strength', 1)).toThrow(StatError);
    expect(() => testCharacter.addPointsToStat('strength', 1)).toThrow(StatError.getMessage(1));
    testCharacter.level += 1; // After level 1, max stat value is 20
    testCharacter.addPointsToStat('strength', 2);
    expect(() => testCharacter.addPointsToStat('strength', 1)).toThrow(StatError);
    expect(() => testCharacter.addPointsToStat('strength', 1)).toThrow(StatError.getMessage(2));
  });

  it ('Should not be able to add negative points to a stat', () => {
    expect(() => testCharacter.addPointsToStat('strength', -1)).toThrow(StatError);
    expect(() => testCharacter.addPointsToStat('strength', -1)).toThrow(StatError.getMessage(0));
  });

  it ('Should be able to reset all stats', () => {
    testCharacter.addPointsToStat('strength', 10);
    testCharacter.addPointsToStat('dexterity', 5);
    testCharacter.addPointsToStat('constitution', 1);
    testCharacter.addPointsToStat('intelligence', 3);
    testCharacter.addPointsToStat('wisdom', 1);
    testCharacter.addPointsToStat('charisma', 3);
    expect(testCharacter.stats.strength).toBe(18);
    expect(testCharacter.stats.dexterity).toBe(13);
    expect(testCharacter.stats.constitution).toBe(9);
    expect(testCharacter.stats.intelligence).toBe(11);
    expect(testCharacter.stats.wisdom).toBe(9);
    expect(testCharacter.stats.charisma).toBe(11);
    expect(testCharacter.stats.assignablePoints).toBe(4);
    testCharacter.resetStats();
    expect(testCharacter.stats.strength).toBe(8);
    expect(testCharacter.stats.dexterity).toBe(8);
    expect(testCharacter.stats.constitution).toBe(8);
    expect(testCharacter.stats.intelligence).toBe(8);
    expect(testCharacter.stats.wisdom).toBe(8);
    expect(testCharacter.stats.charisma).toBe(8);
    expect(testCharacter.stats.assignablePoints).toBe(27);
  });

  it ('Should be able to remove points from a stat', () => {
    testCharacter.addPointsToStat('strength', 10);
    expect(testCharacter.stats.strength).toBe(18);
    testCharacter.removePointsFromStat('strength', 5);
    expect(testCharacter.stats.strength).toBe(13);
  });

  it ('Should not let a stat go below 0', () => {
    testCharacter.addPointsToStat('strength', 10);
    expect(testCharacter.stats.strength).toBe(18);
    expect(() => testCharacter.removePointsFromStat('strength', 24)).toThrow(StatError);
    expect(() => testCharacter.removePointsFromStat('strength', 24)).toThrow(StatError.getMessage(5));
  });

  it ('Should not be able to remove negative points from a stat', () => {
    expect(() => testCharacter.removePointsFromStat('strength', -1)).toThrow(StatError);
    expect(() => testCharacter.removePointsFromStat('strength', -1)).toThrow(StatError.getMessage(4));
  });
});