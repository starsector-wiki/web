import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export class PlanetType {
  id!: string;
  name!: string;
  jsonType!: string;
  descriptionId!: string;
  description!: string;
  tilt!: number;
  pitch!: number;
  rotation!: number;
  atmosphereThickness!: number;
  star!: boolean;
  atmosphereThicknessMin!: number;
  cloudRotation!: number;
  coronaSize!: number;
  cloudTexture!: string;
  texture!: string;
  coronaTexture!: string;
  glowTexture!: string;
  useReverseLightForGlow!: boolean;
  iconTexture!: string;
  blackHole!: boolean;
  nebulaCenter!: boolean;
  scaleMultMapIcon!: number;
  scaleMultStarscapeIcon!: number;
  starscapeIcon!: string;
  pulsar!: boolean;
  shieldThickness!: number;
  shieldTexture!: string;
  shieldTexture2!: string;
  shieldThickness2!: number;
  doNotShowInCombat!: boolean;
  gasGiant!: boolean;
  color!: string;

  static deserialize(object: object) {
    return plainToInstance(PlanetType, object);
  }

  static fakeStation(): PlanetType {
    const result = new PlanetType();

    result.id = 'STATION';
    result.name = 'Station';
    result.jsonType = 'PLANET_TYPE';
    result.descriptionId = '';
    result.description = '';
    result.star = false;
    result.iconTexture = 'graphics/icons/station0.png';
    result.color = '696969';

    return result;
  }
}
