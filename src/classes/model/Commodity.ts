import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class Commodity {
  id!: string;
  jsonType!: string;
  name!: string;
  description!: string;
  origin!: string;
  iconName!: string;
  stackSize!: number;
  order!: number;
  cargoSpace!: number;
  basePrice!: number;
  utility!: number;
  demandClass!: string;
  economyTier!: number;
  econUnit!: number;
  iconWidthMult!: number;
  exportValue!: number;
  primary!: boolean;
  exotic!: boolean;
  meta!: boolean;
  nonEcon!: boolean;
  personnel!: boolean;
  fuel!: boolean;
  supplies!: boolean;
  priceVariability!: number;
  baseDanger!: string;

  static deserialize(object: object) {
    return plainToInstance(Commodity, object);
  }
}
