import StatError from '../src/errors/stat_error';

describe.each([
  { name: 'StatError', ErrorClass: StatError },
])('$name general test', ({ name, ErrorClass }) => {
  it (`Should exist a ${name} class`, () => {
    expect(ErrorClass).toBeDefined();
  });

  it ('Should be an instance of Error', () => {
    expect(new ErrorClass()).toBeInstanceOf(Error);
  });

  it ('Should have its name as a property', () => {
    expect(new ErrorClass()).toHaveProperty('name');
    expect(new ErrorClass().name).toBe(name);
  });
});

describe ('StatError', () => {
  it ('Should throw an unknown "error message" if the opcode is not define', () => {
    expect(() => { throw new StatError(6) }).toThrow('Unknown stat error');
    expect(() => { throw new StatError(-1) }).toThrow('Unknown stat error');
  });
});