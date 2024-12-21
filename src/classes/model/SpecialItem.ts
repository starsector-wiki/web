import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class SpecialItem {
  id!: string;
  jsonType!: string;
  name!: string;
  desc!: string;
  descFirstPara!: string;
  iconName!: string;

  tags!: string[];
  params!: string;
  baseDanger!: string;
  manufacturer!: string;

  stackSize!: number;
  order!: number;
  cargoSpace!: number;
  basePrice!: number;
  rarity!: number;

  static deserialize(object: object) {
    return plainToInstance(SpecialItem, object);
  }
}
