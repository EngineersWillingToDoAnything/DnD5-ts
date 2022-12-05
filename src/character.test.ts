import Character from './character';

let testCharacter: Character;
beforeAll(() => {
  testCharacter = new Character({ name: 'John Doe' });
})

describe ('Character properties tests', () => {
  it('Should have a name', () => {
    expect(testCharacter.name).toBe('John Doe');
  });
});