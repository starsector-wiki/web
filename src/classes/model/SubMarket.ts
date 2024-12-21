import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class SubMarket {
  id!: string;
  jsonType!: string;
  name!: string;
  desc!: string;
  icon!: string;
  factionId!: string;

  static deserialize(object: object) {
    return plainToInstance(SubMarket, object);
  }
}
