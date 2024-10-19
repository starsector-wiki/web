export const enum ShieldType {
  NONE = 'NONE', FRONT = 'FRONT', OMNI = 'OMNI', PHASE = 'PHASE'
}

export const ShieldTypeDisplay = new Map([
  [ShieldType.NONE, '无盾'],
  [ShieldType.FRONT, '前盾'],
  [ShieldType.OMNI, '全盾'],
  [ShieldType.PHASE, '相位线圈']
]);

export const enum HullSize {
  FIGHTER = 'FIGHTER',
  FRIGATE = 'FRIGATE',
  DESTROYER = 'DESTROYER',
  CRUISER = 'CRUISER',
  CAPITAL_SHIP = 'CAPITAL_SHIP'
}

export const HullSizeDisplay = new Map([
  [HullSize.FIGHTER, '战机'],
  [HullSize.FRIGATE, '护卫舰'],
  [HullSize.DESTROYER, '驱逐舰'],
  [HullSize.CRUISER, '巡洋舰'],
  [HullSize.CAPITAL_SHIP, '主力舰']
]);

export const enum WeaponType {
  BALLISTIC = 'BALLISTIC',
  ENERGY = 'ENERGY',
  MISSILE = 'MISSILE',
  LAUNCH_BAY = 'LAUNCH_BAY',
  UNIVERSAL = 'UNIVERSAL',
  HYBRID = 'HYBRID',
  SYNERGY = 'SYNERGY',
  COMPOSITE = 'COMPOSITE',
  BUILT_IN = 'BUILT_IN',
  DECORATIVE = 'DECORATIVE',
  SYSTEM = 'SYSTEM',
  STATION_MODULE = 'STATION_MODULE',
}

export const WeaponTypeDisplay = new Map([
  [WeaponType.BALLISTIC, '实弹'],
  [WeaponType.ENERGY, '能量'],
  [WeaponType.MISSILE, '导弹'],
  [WeaponType.LAUNCH_BAY, '甲板'],
  [WeaponType.UNIVERSAL, '通用'],
  [WeaponType.HYBRID, '混合'],//实弹+能量
  [WeaponType.SYNERGY, '协同'],//能量+导弹
  [WeaponType.COMPOSITE, '复合'],//实弹+导弹
  [WeaponType.BUILT_IN, '内置'],
  [WeaponType.DECORATIVE, '装饰'],
  [WeaponType.SYSTEM, '系统'],
  [WeaponType.STATION_MODULE, '模块'],
]);

export const enum WeaponSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const WeaponSizeDisplay = new Map([
  [WeaponSize.SMALL, '小型'],
  [WeaponSize.MEDIUM, '中型'],
  [WeaponSize.LARGE, '大型'],
]);
