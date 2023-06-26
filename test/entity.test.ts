import Entity from '../src/entity';
import { Size } from '../src/enums';

const testEntity = new Entity({
  name: 'Spike',
  alignment: {
    ethical: 'Neutral',
    moral: 'Neutral'
  }
});

beforeEach(() => {
  testEntity.setMaxHP(0);
  testEntity.resetHealth();
  testEntity.forgetAllLanguages();
});

describe('Entity properties test', () => {
  it('Should have a name', () => {
    expect(testEntity.name).toStrictEqual('Spike');
  });

  it('Should have a true neutral alignment', () => {
    expect(testEntity.alignment).toStrictEqual({
      ethical: 'Neutral',
      moral: 'Neutral'
    });
  });

  it('Should start with the humanoid type by default', () => {
    expect(testEntity.creatureType).toStrictEqual('Humanoid');
  });

  it('Should start with 0 speed by default', () => {
    expect(testEntity.speed).toStrictEqual(0);
  });

  it('Should start with medium size by default', () => {
    expect(testEntity.size).toStrictEqual('Medium');
  });

  it('Should start with 0 currentHP by default', () => {
    expect(testEntity.currentHP).toStrictEqual(0);
  });

  it('Should start with 0 proficiencyBonus by default', () => {
    expect(testEntity.proficiencyBonus).toStrictEqual(0);
  });

  it ('Know at least the "Common" language', () => {
    expect(testEntity.languages).toContain('Common');
  });

  it('Should not have any proficiency by default', () => {
    Object.values(testEntity.proficiencies).forEach((proficiency) => {
      expect(proficiency).toHaveLength(0);
    });
  });

  describe('Stats', () => {
    it('Should start with 0 maxHP by default', () => {
      expect(testEntity.stats.maxHP).toStrictEqual(0);
    });

    it('Should start with 0 armorClass by default', () => {
      expect(testEntity.stats.armorClass).toStrictEqual(0);
    });

    it('Should start with 0 initiative by default', () => {
      expect(testEntity.stats.initiative).toStrictEqual(0);
    });

    it('Should start with 0 passivePerception by default', () => {
      expect(testEntity.stats.passivePerception).toStrictEqual(0);
    });

    it('Should have the six basic attributes at 0', () => {
      Object.values(testEntity.stats.attributes).forEach((attribute) => {
        expect(attribute).toStrictEqual(0);
      });
    });

    it('Should have the eighteen basic skills at 0', () => {
      Object.values(testEntity.stats.skills).forEach((skill) => {
        expect(skill).toStrictEqual(0);
      });
    });

    it('Should have the six basic saving throws at 0', () => {
      Object.values(testEntity.stats.savingThrows).forEach((savingThrow) => {
        expect(savingThrow).toStrictEqual(0);
      });
    });
  });
});

describe('Entity setters', () => {
  it('Should be able to set the max HP', () => {
    testEntity.setMaxHP(10);
    expect(testEntity.stats.maxHP).toStrictEqual(10);
  });

  it('Should be able to set the speed', () => {
    testEntity.setSpeed(10);
    expect(testEntity.speed).toStrictEqual(10);
  });

  it('Should be able to set the armor class', () => {
    testEntity.setArmorClass(10);
    expect(testEntity.stats.armorClass).toStrictEqual(10);
  });

  it('Should be able to set the size', () => {
    testEntity.setSize(Size.Small);
    expect(testEntity.size).toStrictEqual('Small');
  });

  it('Should be able to set the proficiency bonus', () => {
    testEntity.setProficiencyBonus(10);
    expect(testEntity.proficiencyBonus).toStrictEqual(10);
  });

  it('Should be able to set the attributes', () => {
    testEntity.setAttributes({
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    });
    Object.values(testEntity.stats.attributes).forEach((attribute) => {
      expect(attribute).toStrictEqual(10);
    });
  });
});

describe('Entity health system', () => {
  it('Should be able to reset the health', () => {
    testEntity.setMaxHP(10);
    testEntity.resetHealth();
    expect(testEntity.currentHP).toStrictEqual(10);
  });

  it('Should be able to heal when assigning new maxHP', () => {
    testEntity.setMaxHP(10, true);
    expect(testEntity.currentHP).toStrictEqual(10);
  });

  it('Should be able to take damage', () => {
    testEntity.setMaxHP(10, true);
    testEntity.takeDamage(5);
    expect(testEntity.currentHP).toStrictEqual(5);
  });

  it('Should not be able to take damage below 0', () => {
    testEntity.setMaxHP(10, true);
    testEntity.takeDamage(15);
    expect(testEntity.currentHP).toStrictEqual(0);
  });

  it('Should be able to heal', () => {
    testEntity.setMaxHP(10, true);
    testEntity.takeDamage(7);
    testEntity.heal(3);
    expect(testEntity.currentHP).toStrictEqual(6);
  });

  it('Should not be able to heal above maxHP', () => {
    testEntity.setMaxHP(10);
    testEntity.heal(30);
    expect(testEntity.currentHP).toStrictEqual(10);
  });
});

describe('Entity language system', () => {
  it ('Should tell if it knows a language', () => {
    expect(testEntity.knowsLanguage('Common')).toBeTruthy();
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
  });

  it ('Should be able to learn a language', () => {
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
    testEntity.learnLanguage('Elvish');
    expect(testEntity.knowsLanguage('Elvish')).toBeTruthy();
  });

  it ('Should not be able to learn a language twice', () => {
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
    testEntity.learnLanguage('Elvish');
    testEntity.learnLanguage('Elvish');
    expect(testEntity.languages).toHaveLength(2); // Common + Elvish
  });

  it ('Should be able to forget a language', () => {
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
    testEntity.learnLanguage('Elvish');
    expect(testEntity.knowsLanguage('Elvish')).toBeTruthy();
    testEntity.forgetLanguage('Elvish');
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
  });

  it ('Should not be able to forget a language it does not know', () => {
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
    testEntity.forgetLanguage('Elvish');
    expect(testEntity.knowsLanguage('Elvish')).toBeFalsy();
  });

  it ('Should be able to forget all languages (except Common)', () => {
    testEntity.learnLanguage('Elvish');
    testEntity.learnLanguage('Dwarvish');
    testEntity.learnLanguage('Infernal');
    expect(testEntity.languages).toHaveLength(4); // Common + 3 new languages
    testEntity.forgetAllLanguages();
    expect(testEntity.languages).toHaveLength(1); // Common
    expect(testEntity.knowsLanguage('Common')).toBeTruthy();
  });
});