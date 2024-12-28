import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';
import { Faction } from './Faction';
import { Planet } from './Planet';

export class Person {
  id!: string;
  jsonType!: string;

  firstName!: string;
  lastName!: string;
  gender!: string;

  rankId!: string;
  rank!: string;
  rankArticle!: string;

  postId!: string;
  post!: string;
  postArticle!: string;

  portraitSprite!: string;

  factionId!: string;

  importance!: number;
  contactWeight!: number;
  tags!: string[];
  marketId!: string;
  aiCore!: boolean;
  defaults!: boolean;

  faction!: Faction;
  planet!: Planet;

  static deserialize(object: object) {
    return plainToInstance(Person, object);
  }
}
