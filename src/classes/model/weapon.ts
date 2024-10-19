import { plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Weapon {
  id!: string;
  jsonType!: string;
  name!: string;
  description!: string;
  //    原始数据部分下面的特别说明
  customPrimary!: string;
  //    炮塔贴图
  turretSprite!: string;
  //    固定槽位贴图
  hardPointSprite!: string;

  //    战术应用
  primaryRoleStr!: string;
  //    安装类型
  size!: string;
  mountType!: string;
  //    部署点
  ordnancePoint!: number;

  //    武器射程
  maxRange!: number;
  //    伤害
  damagePerShot!: number;
  //    爆发数量
  burstSize!: number;
  //    伤害/秒
  dps!: number;
  //    持续伤害DPS
  sustainedDps!: number;
  //    EMP伤害
  empPerShot!: number;
  //    EMP伤害每秒
  empPerSecond!: number;

  //    幅能每秒
  fluxPerSecond!: number;
  //    持续幅能每秒
  sustainedFluxPerSecond!: number;
  //    幅能/non-EMP伤害
  fluxPerDamage!: number;

  customAncillary!: string;
  @Type(() => DamageType)
  damageType!: DamageType;
  accuracyStr!: string;
  turnRateStr!: string;
  reFireDelay!: number;

  tags!: string[];

  static deserialize(object: object) {
    return plainToInstance(Weapon, object);
  }
}

export class DamageType {
  displayName!: string;
  description!: string;
}
