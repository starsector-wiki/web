import { plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';
import { Market } from './Market';

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

  @Type(() => Market)
  market!: Market;


  static deserialize(object: object) {
    return plainToInstance(Planet, object);
  }
}
