export interface CsvProduct {
  id: string;
  ean: string;
  manufacturer: string;
  product: string;
  'packaging product': string;
  description: string;
  'packaging unit': CsvBaseProductPackaging;
  'amount per unit': string;
  stock: number;
  foo: 'string';
  warehouse: 'string';
}

export enum CsvBaseProductPackaging{
  bottle = 'bottle',
  can = 'can',
}
