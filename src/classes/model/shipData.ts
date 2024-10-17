export interface ShipData {
  id: string;
  name: string;
  designation: string | null;
  descriptionPrefix: string | null;
  descriptionContent: string;
  sprite: string;

  size: string;
  crToDeploy: number;
  repairPercentPerDay: number;
  suppliesToRecover: number;
  noCRLossSeconds: number;
  ordnancePoints: number;

  suppliesPerMonth: number;
  cargo: number;
  maxCrew: number;
  minCrew: number;
  fuel: number;
  maxBurn: number;
  fuelPerLY: number;
  sensorProfile: number;
  sensorStrength: number;

  hitPoints: number;
  armorRating: number;
  shieldType: string;
  shieldRadius: number;
  shieldCost: number;
  fluxPerDamageAbsorbed: number;
  phaseCost: number;
  phaseUpKeep: number;
  phased: boolean;
  fluxCapacity: number;
  fluxDissipation: number;
  maxSpeed: number;

  shipSystemId: string;
  shipDefenseId: string;

  builtInMods: string[];
  builtInWeapons: Map<string, string>;
  allWeaponSlots: WeaponSlot[];

  fleetPoints: number;
  baseValue: number;
}

export interface WeaponSlot {
  id: string;
  slotSize: string;
  weaponType: string;
  location: { x: number, y: number };
  angle: number;

  weaponSlot: boolean;
  hidden: boolean;
  builtIn: boolean;
}

