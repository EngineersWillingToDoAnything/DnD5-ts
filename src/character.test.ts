import Character from './character';

let testCharacter: Character;
beforeAll(() => {
  testCharacter = new Character('John Doe');
})

beforeEach(() => {
  testCharacter.resetHealth();
});


describe ('Character properties tests', () => {
  it('Should have a name', () => {
    expect(testCharacter.name).toBe('John Doe');
  });

  it ('Should start with level 1', () => {
    expect(testCharacter.level).toBe(1);
  });

  it ('Should start with 3 health points', () => {
    expect(testCharacter.healthPoints).toBe(3);
  });
});


describe ('Character health system', () => {
  it ('Should be able to take damage', () => {
    testCharacter.takeDamage(1);
    expect(testCharacter.healthPoints).toBe(2);
  });

  it ('Should not be able to have negative health points', () => {
    testCharacter.takeDamage(10);
    expect(testCharacter.healthPoints).toBe(0);
  });

  it ('Should be able to reset health points', () => {
    testCharacter.takeDamage(1);
    testCharacter.resetHealth();
    expect(testCharacter.healthPoints).toBe(3);
  });

  it ('Should be able to heal', () => {
    testCharacter.takeDamage(2);
    testCharacter.heal(1);
    expect(testCharacter.healthPoints).toBe(2);
  });

  it ('Should not be able to heal over 3 health points', () => {
    testCharacter.heal(10);
    expect(testCharacter.healthPoints).toBe(3);
  });
});