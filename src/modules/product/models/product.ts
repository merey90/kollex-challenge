export interface Product {
  id: string;
  gtin?: string;
  manufacturer: string;
  name: string;
  package: Packaging;
  baseProductPackaging: BaseProductPackaging;
   // TODO: remove optional param after clarification
  baseProductUnit?: BaseProductUnit;
  baseProductAmount: number;
  baseProductQuantity: number;
}

export enum Packaging{
  CA = 'CA',
  BX = 'BX',
  BO = 'BO',
}

export enum BaseProductPackaging{
  BO = 'BO',
  CN = 'CN',
}

export enum BaseProductUnit{
  LT = 'LT',
  GR = 'GR',
}
