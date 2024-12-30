import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';
import { Planet } from './Planet';

export class Industry {
  id!: string;
  jsonType!: string;
  pluginClass!: string;
  tags!: string[];
  name!: string;
  desc!: string;
  cost!: number;
  buildTime!: number;
  upkeep!: number;
  income!: number;
  imageName!: string;
  upgrade!: string;
  downgrade!: string;
  order!: number;
  data!: string;
  disruptDanger!: string;

  planets: Planet[] = [];

  static deserialize(object: object) {
    return plainToInstance(Industry, object);
  }
}
