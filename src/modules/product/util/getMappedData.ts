import { Product, Packaging, BaseProductPackaging } from '../models/product';
import { readFromFile } from './readFromFile';
import { DataType } from '../models/util';
import { JsonProduct, JsonPackaging, JsonBaseProductPackaging } from '../models/jsonProduct';

interface IndexedProducts {
  [key: string]: Product;
}

export const getMappedData = async (): Promise<Product[]> => {
  const products: IndexedProducts = {};
  const jsonData = await readFromFile(DataType.JSON);
  const csvData = await readFromFile(DataType.CSV);

  jsonData.map((jsonProduct: JsonProduct) => {
    const product: Product = {
      id: jsonProduct.PRODUCT_IDENTIFIER,
      gtin: jsonProduct.EAN_CODE_GTIN,
      manufacturer: jsonProduct.BRAND,
      name: jsonProduct.NAME,
      package: packageMapper(jsonProduct.PACKAGE),
      baseProductPackaging: baseProductPackageMapper(jsonProduct.VESSEL),
      // baseProductUnit: jsonProduct., // Need more info
      baseProductAmount: jsonProduct.LITERS_PER_BOTTLE,
      baseProductQuantity: jsonProduct.BOTTLE_AMOUNT,
    };
    products[jsonProduct.PRODUCT_IDENTIFIER] = product;
  });

  return Object.values(products);
};

const packageMapper = (packageType: string): Packaging  => {
  switch (packageType) {
    case JsonPackaging.bottle:
      return Packaging.BO;
    case JsonPackaging.box:
      return Packaging.BX;
    case JsonPackaging.case:
      return Packaging.CA;
    default:
      return;
  }
};

const baseProductPackageMapper = (baseProductPackage: string): BaseProductPackaging => {
  switch (baseProductPackage) {
    case JsonBaseProductPackaging.bottle:
      return BaseProductPackaging.BO;
    case JsonBaseProductPackaging.can:
      return BaseProductPackaging.CN;
    default:
      return;
  }
}