import Character from './character';

let testCharacter: Character;
beforeAll (() => {
  testCharacter = new Character('John Doe');
});

beforeEach (() => {
  testCharacter.resetHealth();
  testCharacter.forgetAllLanguages();
});


describe ('Character properties tests', () => {
  it ('Should have a name', () => {
    expect(testCharacter.name).toBe('John Doe');
  });

  it ('Should start with level 1', () => {
    expect(testCharacter.level).toBe(1);
  });

  it ('Should start with its max health points', () => {
    expect(testCharacter.healthPoints.current).toBe(testCharacter.healthPoints.max);
  });

  it ('Know at least the "Common" language', () => {
    expect(testCharacter.knowsLanguage('Common')).toBe(true);
  });

  it ('Should not know any other language', () => {
    expect(testCharacter.knowsLanguage('Dwarvish')).toBe(false);
    expect(testCharacter.knowsLanguage('Elvish')).toBe(false);
    expect(testCharacter.knowsLanguage('Infernal')).toBe(false);
  });

  it ('Should have a true neutral alignment', () => {
    expect(testCharacter.alignment.ethical).toBe('Neutral');
    expect(testCharacter.alignment.moral).toBe('Neutral');
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