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

type Packaging = 'CA' | 'BX' | 'BO';
type BaseProductPackaging = 'BO' | 'CN';
type BaseProductUnit = 'LT' | 'GR';
