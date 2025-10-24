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
    const result = plainToInstance(SubMarket, object);
    if (!result.name) {
      result.name = '军用市场';
    }
    return result;
  }
}
