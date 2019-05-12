import sinon from 'sinon';

import {
  packageMapper,
  baseProductPackageMapper,
  populateMissedProps,
  getMappedData
} from './getMappedData';
import { Product, Packaging, BaseProductPackaging, BaseProductUnit } from '../models/product';
import { fileReaderModule } from './readFromFile';
import { JsonPackaging, JsonBaseProductPackaging } from '../models/jsonProduct';
import { CsvBaseProductPackaging } from '../models/csvProduct';

test('packageMapper() should properly map the package type', () => {
  expect(packageMapper('bottle')).toBe('BO');
  expect(packageMapper('box')).toBe('BX');
  expect(packageMapper('case')).toBe('CA');
  expect(packageMapper('single')).toBe('BO');
  expect(packageMapper('case 20')).toBe('CA');
  expect(packageMapper('123 box')).toBe('BX');
});

test('baseProductPackageMapper() should properly map the base package type', () => {
  expect(baseProductPackageMapper('bottle')).toBe('BO');
  expect(baseProductPackageMapper('can')).toBe('CN');
});

test('populateMissedProps() should populate missed props', () => {
  const oldProduct: Product = {
    id: '12345600001',
    gtin: '05449000000001',
    manufacturer: 'Drinks Corp.',
    name: undefined,
    package: Packaging.CA,
    baseProductPackaging: BaseProductPackaging.BO,
    baseProductUnit: BaseProductUnit.LT,
    baseProductAmount: 1,
    baseProductQuantity: 25,
  };

  const newProduct: Product = {
    id: '12345600001',
    manufacturer: 'Drinks Corp.',
    name: 'Soda Drink, 12x 1L',
    package: Packaging.CA,
    baseProductPackaging: undefined,
    baseProductUnit: undefined,
    baseProductAmount: 1,
    baseProductQuantity: 20,
  };

  const richProduct: Product = {
    id: '12345600001',
    gtin: '05449000000001',
    manufacturer: 'Drinks Corp.',
    name: 'Soda Drink, 12x 1L',
    package: Packaging.CA,
    baseProductPackaging: BaseProductPackaging.BO,
    baseProductUnit: BaseProductUnit.LT,
    baseProductAmount: 1,
    baseProductQuantity: 25,
  };
  expect(populateMissedProps(oldProduct, newProduct)).toEqual(richProduct);
});

test('getMappedData() should return mapped data', async () => {
  sinon.stub(fileReaderModule, 'readFromJson').resolves([{
    PRODUCT_IDENTIFIER:'12345600001',
    EAN_CODE_GTIN:'05449000000001',
    BRAND:'Drinks Corp.',
    NAME:'Soda Drink, 12x 1L',
    PACKAGE: JsonPackaging.case,
    ADDITIONAL_INFO:'',
    VESSEL: JsonBaseProductPackaging.bottle,
    LITERS_PER_BOTTLE: 1.2,
    BOTTLE_AMOUNT: 12
  }]);
  sinon.stub(fileReaderModule, 'readFromCsv').resolves([{
    id:'12345600001',
    ean:'5449000000001',
    manufacturer:'Drinks Corp.',
    product:'Soda Drink, 12 * 1,0l',
    description:'Lorem ipsum usu amet dicat nullam ea',
    'packaging product':'case 12',
    foo: 'bar',
    'packaging unit': CsvBaseProductPackaging.bottle,
    'amount per unit':'1.2l',
    stock:123,
    warehouse:'north'
  }]);

  const expectedResult: Product[] = [{
    id:'12345600001',
    gtin:'05449000000001',
    manufacturer:'Drinks Corp.',
    name:'Soda Drink, 12x 1L',
    package: Packaging.CA,
    baseProductPackaging: BaseProductPackaging.BO,
    baseProductUnit: BaseProductUnit.LT,
    baseProductAmount: +(1.2).toFixed(2),
    baseProductQuantity:12
  }];

  const actualResult = await getMappedData();
  expect(actualResult).toEqual(expectedResult);
});
