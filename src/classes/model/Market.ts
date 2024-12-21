export class Market {
  id!: string;
  name!: string;
  starSystemId!: string;

  size!: number;
  stability!: number;
  tariff!: number;
  hazard!: number;

  shipQualityFactor!: number;

  marketConditionIds!: string[];
  subMarketIds!: string[];
  industryIds!: string[];

  personIds!: string[];
  adminId!: string;

  hidden!: boolean;

  tags!: string[];
}
