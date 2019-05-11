export interface Product {
  id: string;
  gtin: string;
  manufacturer: string;
  name: string;
  package: Packaging;
  baseProductPackaging: BaseProductPackaging;
  baseProductUnit: BaseProductUnit;
  baseProductAmount: number;
  baseProductQuantity: number;
}

enum Packaging{
  CA = 'CA',
  BX = 'BX',
  BO = 'BO',
}

enum BaseProductPackaging{
  BO = 'BO',
  CN = 'CN',
}

enum BaseProductUnit{
  LT = 'LT',
  GR = 'GR',
}
