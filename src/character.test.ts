import Character from './character';

let testCharacter: Character;
beforeAll(() => {
  testCharacter = new Character('John Doe');
})

describe ('Character properties tests', () => {
  it('Should have a name', () => {
    expect(testCharacter.name).toBe('John Doe');
  });

  it ('Should start with level 1', () => {
    expect(testCharacter.level).toBe(1);
  });
});