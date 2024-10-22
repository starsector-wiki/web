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
  turretUnderSprite!: string;
  turretGunSprite!: string;
  turretGlowSprite!: string;
  //    固定槽位贴图
  hardPointSprite!: string;
  hardPointUnderSprite!: string;
  hardPointGunSprite!: string;
  hardPointGlowSprite!: string;
  //    渲染用标签
  renderHints!: string[];
  //    导弹位置
  turretOffsets!: number[];
  projSpriteName?: string;

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
  //    导弹飞行速度
  speedStr!: string;
  //    导弹追踪性能
  trackingStr!: string;
  //    武器精准度
  accuracyStr!: string;
  //    武器转向速度
  turnRateStr!: string;
  //    最大充能数/最大备弹数
  maxAmmo?: number;
  //    充能时间/装弹时间
  reloadTime?: number;
  //    每次充能数/每次装弹数
  reloadSize!: number;
  //    武器开火间隔
  reFireDelay!: number;

  tags!: string[];

  shipIds: string[] = []
  variantIds: string[] = []

  static deserialize(object: object) {
    return plainToInstance(Weapon, object);
  }
}

export class DamageType {
  displayName!: string;
  description!: string;
}
