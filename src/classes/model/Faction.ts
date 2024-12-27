import { plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Faction {
  id!: string;
  jsonType!: string;

  displayName!: string;
  displayNameLong!: string;
  personNamePrefix!: string;
  shipNamePrefix!: string;
  description!: string;

  logo!: string;
  crest!: string;

  pickPersonality!: string;

  @Type(() => Map)
  relationshipMap!: Map<string, number>;
  illegalCommodityIds!: string[];

  knownShipIds!: string[];
  alwaysKnownShipIds!: string[];
  priorityShipIds!: string[];

  knownWeaponIds!: string[];
  priorityWeaponIds!: string[];
  @Type(() => Map)
  weaponSellFrequency!: Map<string, number>;

  knownFighterIds!: string[];
  priorityFighterIds!: string[];
  @Type(() => Map)
  fighterSellFrequency!: Map<string, number>;

  knownIndustryIds!: string[];

  knownHullModIds!: string[];
  priorityHullModIds!: string[];
  @Type(() => Map)
  hullModSellFrequency!: Map<string, number>;

  tariffFraction!: number;
  tollFraction!: number;
  fineFraction!: number;

  playerFaction!: boolean;
  showInIntelTab!: boolean;
  neutralFaction!: boolean;

  static deserialize(object: object) {
    return plainToInstance(Faction, object);
  }
}
