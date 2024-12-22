import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class StarSystem {
  id!: string;
  jsonType!: string;
  name!: string;
  location!: { x: number; y: number; };
  type!: string;

  constellationId!: string;
  planetIds!: string[];

  starId!: string;
  secondaryId!: string;
  tertiaryId!: string;

  procgen!: boolean;
  iconColor: string = 'white';

  static deserialize(object: object) {
    return plainToInstance(StarSystem, object);
  }
}
