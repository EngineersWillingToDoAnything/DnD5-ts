import Race from '../src/race';
import { Size } from '../src/enums';
import type { Ability } from '../src/types';

// Since it's an abstract class, we need to create a child class to test it
class RaceTested extends Race {};
const raceTested = new RaceTested({
  name: 'Tested',
  speed: 30,
  size: Size.Medium,
  extraAttributesPoints: {}
});

describe('Race properties tests', () => {
  it('Should have a name', () => {
    expect(raceTested.name).toStrictEqual('Tested');
  });

  it('Should have a speed', () => {
    expect(raceTested.speed).toStrictEqual(30);
  });

  it('Should have a size', () => {
    expect(raceTested.size).toStrictEqual('Medium');
  });

  it('Should be able to store extra points for attributes', () => {
    expect(raceTested.extraAttributesPoints).toStrictEqual({});
  });

  it('Should be able to have abilities', () => {
    expect(raceTested.abilities).toStrictEqual({});
  });
});

describe('Parameters given at constructor', () => {
  it('Should assign all the properties properly', () => {
    const otherRaceTested = new RaceTested({
      name: 'KissFan',
      speed: 45,
      size: Size.Large,
      extraAttributesPoints: {}
    });
    expect(otherRaceTested.name).toStrictEqual('KissFan');
    expect(otherRaceTested.speed).toStrictEqual(45);
    expect(otherRaceTested.size).toStrictEqual('Large');
  });

  it('Should not have a negative speed', () => {
    expect(() => {
      new RaceTested({
        name: 'Tested',
        speed: -1,
        size: Size.Gargantuan,
        extraAttributesPoints: {}
      })
    }).toThrowError('The speed of the race cannot be negative');
  });

  it('Should be able to provide extra attributes points', () => {
    const otherRaceTested = new RaceTested({
      name: 'Reptilian',
      speed: 43,
      size: Size.Small,
      extraAttributesPoints: {
        strength: 1,
        dexterity: 1,
        constitution: 2,
      }
    });
    expect(otherRaceTested.extraAttributesPoints).toStrictEqual({
      strength: 1,
      dexterity: 1,
      constitution: 2
    });
  });

  it('Should be able to provide abilities related to the race', () => {
    const menacing: Ability = {
      description: 'You gain proficiency in the Intimidation skill.',
    }
    const otherRaceTested = new RaceTested({
      name: 'Android',
      speed: 50,
      size: Size.Huge,
      extraAttributesPoints: {},
      abilities: {
        menacing
      }
    });
    expect(otherRaceTested.abilities).toStrictEqual({ menacing });
  });
});