import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';
import { Planet } from './Planet';

export class MarketCondition {
  id!: string;
  jsonType!: string;
  name!: string;
  desc!: string;
  icon!: string;
  scriptClass!: string;
  order!: number;
  planetary!: boolean;
  decivRemove!: boolean;

  planets: Planet[] = [];

  static deserialize(object: object) {
    return plainToInstance(MarketCondition, object);
  }
}
