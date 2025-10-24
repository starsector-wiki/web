import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class ShipSystem {
  id!: string;
  jsonType!: string;
  name!: string;
  description!: string;
  shortDescription!: string;
  icon!: string;

  shipIds: string[] = [];
  defenseShipIds: string[] = [];

  static deserialize(object: object) {
    return plainToInstance(ShipSystem, object);
  }
}
