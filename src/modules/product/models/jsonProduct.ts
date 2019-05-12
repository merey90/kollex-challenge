export interface JsonProduct {
  PRODUCT_IDENTIFIER: string;
  EAN_CODE_GTIN: string;
  BRAND: string;
  NAME: string;
  PACKAGE: JsonPackaging;
  ADDITIONAL_INFO?: string;
  VESSEL: JsonBaseProductPackaging;
  LITERS_PER_BOTTLE: number;
  BOTTLE_AMOUNT: number;
}

export enum JsonPackaging{
  case = 'case',
  box = 'box',
  bottle = 'bottle',
}

export enum JsonBaseProductPackaging{
  bottle = 'bottle',
  can = 'can',
}
