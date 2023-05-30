import Character from '../src/character';
import StatError from '../src/errors/stat_error';
import Human from '../src/races/human';
import { Ability } from '../src/types';
import type { RaceProperties } from '../src/race';

let testCharacter: Character;
beforeAll (() => {
  testCharacter = new Character({ name: 'John Doe' });
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

  describe ('Stats properties', () => {
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

  describe ('Proficiencies properties', () => {
    it ('Should have a proficiency section', () => {
      expect(testCharacter).toHaveProperty('proficiencies');
      expect(testCharacter.proficiencies).toHaveProperty('armor');
      expect(testCharacter.proficiencies).toHaveProperty('weapons');
      expect(testCharacter.proficiencies).toHaveProperty('tools');
      expect(testCharacter.proficiencies).toHaveProperty('savingThrows');
      expect(testCharacter.proficiencies).toHaveProperty('skills');
    });

    it ('Should not have any proficiency', () => {
      expect(testCharacter.proficiencies.armor).toHaveLength(0);
      expect(testCharacter.proficiencies.weapons).toHaveLength(0);
      expect(testCharacter.proficiencies.tools).toHaveLength(0);
      expect(testCharacter.proficiencies.savingThrows).toHaveLength(0);
      expect(testCharacter.proficiencies.skills).toHaveLength(0);
    });

    it ('Should have a proficiency bonus of 2', () => {
      expect(testCharacter).toHaveProperty('proficiencyBonus');
      expect(testCharacter.proficiencyBonus).toBe(2);
    });
  });

  it ('Should have a speed of 0', () => {
    expect(testCharacter).toHaveProperty('speed');
    expect(testCharacter.speed).toBe(0);
  });

  it ('Should have a size of "Medium"', () => {
    expect(testCharacter).toHaveProperty('size');
    expect(testCharacter.size).toBe('Medium');
  });

  it ('Should not come with any ability', () => {
    expect(testCharacter).toHaveProperty('abilities');
    expect(testCharacter.abilities).toEqual({});
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
    expect(testCharacter.knowsLanguage('Common')).toBeTruthy();
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

describe ('Character constructor with parameters', () => {
  it ('Should be able to create with a name', () => {
    const otherCharacter = new Character({ name: 'Frank Sinatra' });
    expect(otherCharacter.name).toBe('Frank Sinatra');
  });

  it ('Should be able to create with a specific level', () => {
    const otherCharacter = new Character({ name: 'Michael Scott', level: 5 });
    expect(otherCharacter.level).toBe(5);
  });

  it ('Should be able to create with a custom alignment', () => {
    const otherCharacter = new Character({
      name: 'Rick Sanchez',
      alignment: {
        ethical: 'Chaotic',
        moral: 'Good'
      }
    });
    expect(otherCharacter.alignment.ethical).toBe('Chaotic');
    expect(otherCharacter.alignment.moral).toBe('Good');
  });

  it ('Should be able to create with more than one language', () => {
    const otherCharacter = new Character({
      name: 'Legolas',
      languages: ['Elvish', 'Dwarvish']
    });
    expect(otherCharacter.knowsLanguage('Elvish')).toBe(true);
    expect(otherCharacter.knowsLanguage('Dwarvish')).toBe(true);
    expect(otherCharacter.languagesKnown()).toHaveLength(3); // Common + 3 new languages
  });

  it ('Should be able to create with a custom health', () => {
    const otherCharacter = new Character({
      name: 'Darth Vader',
      healthPoints: {
        max: 100,
        current: 50
      }
    });
    expect(otherCharacter.healthPoints.current).toBe(50);
    expect(otherCharacter.healthPoints.max).toBe(100);
  });

  describe ('Character constructor with custom stats', () => {
    it ('Should be able to create with custom stat values', () => {
      const otherCharacter = new Character({
        name: 'Ash Ketchum',
        stats: {
          strength: 10,
          charisma: 4,
          dexterity: 15
        }
      });
      expect(otherCharacter.stats.strength).toBe(10);
      expect(otherCharacter.stats.charisma).toBe(4);
      expect(otherCharacter.stats.dexterity).toBe(15);
      expect(otherCharacter.stats.assignablePoints).toBe(22);
    });

    it ('Should not change the stats that are not specified', () => {
      const otherCharacter = new Character({
        name: 'Juan Jose Jose',
        stats: {
          strength: 10,
          charisma: 4,
        }
      });
      expect(otherCharacter.stats.constitution).toBe(8);
      expect(otherCharacter.stats.intelligence).toBe(8);
      expect(otherCharacter.stats.wisdom).toBe(8);
    });
  });

  it ('Should be able to create with a race associated', () => {
    const otherCharacter = new Character({
      name: 'Freddy Mercury',
      race: new Human()
    });
    const regularHuman = new Human();

    expect(otherCharacter.raceName).toBe(regularHuman.name);
    expect(otherCharacter.speed).toBe(regularHuman.speed);
    expect(otherCharacter.size).toBe(regularHuman.size);
  });
});

describe ('Character proficiency system', () => {
  it('Should have a proficiency bonus', () => {
    expect(testCharacter.proficiencyBonus).toBe(2);
  });

  it('Should be able to add any proficiency', () => {
    testCharacter.addProficiency('skills', ['acrobatics']);
    testCharacter.addProficiency('armor', ['light armor']);
    testCharacter.addProficiency('savingThrows', ['dexterity']);
    expect(testCharacter.proficiencies.armor).toContain('light armor');
    expect(testCharacter.proficiencies.skills).toContain('acrobatics');
  });

  it('Should be able to add many proficiencies at once', () => {
    testCharacter.addProficiency('skills', ['acrobatics', 'athletics', 'deception']);
    expect(testCharacter.proficiencies.skills).toContain('acrobatics');
    expect(testCharacter.proficiencies.skills).toContain('athletics');
    expect(testCharacter.proficiencies.skills).toContain('deception');
  });
});

describe ('Assignation of properties from a race', () => {
  it ('Should assign the features coming from the race ', () => {
    const otherCharacter = new Character({ name: 'Damiano David' });
    const race: RaceProperties = { name: 'Human', speed: 30, size: 'Medium', extraStatsPoints: {} };

    otherCharacter.assignRace(race);
    expect(otherCharacter.speed).toBe(30);
    expect(otherCharacter.size).toBe('Medium');
    expect(otherCharacter.raceName).toBe('Human');
  });

  it ('Should assign the extra stats points coming from the race', () => {
    const otherCharacter = new Character({
      name: 'Michael Jackson',
      race: new Human()
    });

    // Human adds 1 point to all stats
    expect(otherCharacter.stats).toEqual({
      strength: 9,
      dexterity: 9,
      constitution: 9,
      intelligence: 9,
      wisdom: 9,
      charisma: 9,
      assignablePoints: 27
    });
  });

  it ('Should assign the abilities related to the race', () => {
    const otherCharacter = new Character({ name: 'Oliver Sykes' });
    const darkVision: Ability = {
      description: "You can see in the dark up to 60 feet"
    }
    const raceToTest: RaceProperties = {
      name: 'Programmer',
      speed: 30,
      size: 'Medium',
      extraStatsPoints: {},
      abilities: {
        darkVision
      }
    };

    otherCharacter.assignRace(raceToTest);
    expect(otherCharacter.abilities).toEqual({ darkVision });
  });
});