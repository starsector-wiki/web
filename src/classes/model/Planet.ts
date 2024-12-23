import { plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';
import { Market } from './Market';
import { PlanetType } from './PlanetType';
import { StarSystem } from './StarSystem';

export class Planet {
  id!: string;
  jsonType!: string;
  name!: string;
  radius!: number;
  factionId!: string;
  customDescription!: string;
  tags!: string[];
  orbitFocusId!: string;
  starSystemId!: string;

  // PlanetSpecApi
  typeId!: string;
  overrideDesc!: string;

  type!: PlanetType;

  @Type(() => Market)
  market!: Market;

  location!: { x: number; y: number; };
  locationInHyperspace!: { x: number; y: number; };
  starSystem!: StarSystem;

  static deserialize(object: object) {
    return plainToInstance(Planet, object);
  }
}
