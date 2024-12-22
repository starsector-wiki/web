import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

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

  static deserialize(object: object) {
    return plainToInstance(Industry, object);
  }
}
