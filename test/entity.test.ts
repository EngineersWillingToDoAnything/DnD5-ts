import Entity from '../src/entity';

const testEntity = new Entity({
  name: 'Spike',
  alignment: {
    ethical: 'Neutral',
    moral: 'Neutral'
  }
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