import Race from '../src/race';

// Since it's an abstract class, we need to create a child class to test it
class RaceTested extends Race {};
let raceTested: Race;

beforeAll(() => {
  raceTested = new RaceTested({
    name: 'Tested',
    speed: 30,
    size: 'Medium',
    extraStatsPoints: {}
  });
});

describe ('Race properties tests', () => {
  it ('Should have a name', () => {
    expect(raceTested).toHaveProperty('name');
    expect(typeof raceTested.name).toBe('string');
  });

  it ('Should have a speed', () => {
    expect(raceTested).toHaveProperty('speed');
    expect(typeof raceTested.speed).toBe('number');
  });

  it ('Should have a size', () => {
    expect(raceTested).toHaveProperty('size');
    expect(typeof raceTested.size).toBe('string');
  });

  describe ('Extra stats points', () => {
    it ('Should be able to have extra stats points', () => {
      expect(raceTested).toHaveProperty('extraStatsPoints');
    });

    it ('Should start with an empty stat object by default', () => {
      expect(raceTested.extraStatsPoints).toEqual({});
    });
  });
});

describe ('Parameters given at constructor', () => {
  it ('Should assign all the properties properly', () => {
    const otherRaceTested = new RaceTested({
      name: 'KissFan',
      speed: 45,
      size: 'Large',
      extraStatsPoints: {}
    });
    expect(otherRaceTested.name).toBe('KissFan');
    expect(otherRaceTested.speed).toBe(45);
    expect(otherRaceTested.size).toBe('Large');
  });

  it ('Should not have a negative speed', () => {
    expect(() => { new RaceTested({
      name: 'Tested',
      speed: -1,
      size: 'Medium',
      extraStatsPoints: {} }) }).toThrowError('The speed of the race cannot be negative');
  });

  it ('Should be able ot provide extra stats points', () => {
    const otherRaceTested = new RaceTested({
      name: 'Reptilian',
      speed: 43,
      size: 'Small',
      extraStatsPoints: {
        strength: 1,
        dexterity: 1,
        constitution: 2,
      }
    });
    expect(otherRaceTested.extraStatsPoints).toEqual({
      strength: 1,
      dexterity: 1,
      constitution: 2
    });
  });
});