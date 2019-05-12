import { Product, Packaging, BaseProductPackaging, BaseProductUnit } from '../models/product';
import { readFromFile } from './readFromFile';
import { DataType } from '../models/util';
import { JsonPackaging, JsonBaseProductPackaging } from '../models/jsonProduct';
import { CsvBaseProductPackaging } from '../models/csvProduct';

interface IndexedProducts {
  [key: string]: Product;
}

export const getMappedData = async (): Promise<Product[]> => {
  const products: IndexedProducts = {};
  const jsonData = await readFromFile(DataType.JSON);
  const csvData = await readFromFile(DataType.CSV);

  for (const jsonProduct of jsonData) {
    if (!jsonProduct.PRODUCT_IDENTIFIER) continue;
    const product: Product = {
      id: jsonProduct.PRODUCT_IDENTIFIER,
      gtin: jsonProduct.EAN_CODE_GTIN,
      manufacturer: jsonProduct.BRAND,
      name: jsonProduct.NAME,
      package: packageMapper(jsonProduct.PACKAGE),
      baseProductPackaging: baseProductPackageMapper(jsonProduct.VESSEL),
      baseProductUnit: BaseProductUnit.LT, // Need more info
      baseProductAmount: jsonProduct.LITERS_PER_BOTTLE,
      baseProductQuantity: jsonProduct.BOTTLE_AMOUNT,
    };

    products[jsonProduct.PRODUCT_IDENTIFIER] = product;
  }

  for (const csvProduct of csvData) {
    if (!csvProduct.id) continue;
    const product: Product = {
      id: csvProduct.id,
      gtin: csvProduct.ean,
      manufacturer: csvProduct.manufacturer,
      name: csvProduct.product,
      package: packageMapper(csvProduct['packaging product']),
      baseProductPackaging: baseProductPackageMapper(csvProduct['packaging unit']),
      baseProductUnit: BaseProductUnit.LT, // Need more info
      baseProductAmount: +(csvProduct['amount per unit'].slice(0, -1)),
      baseProductQuantity: csvProduct.stock,
    };

    // if no such product exists, then save it
    if (!products[csvProduct.id]) {
      products[csvProduct.id] = product;
    } else { // If product already saved, then populate missed values
      const oldProduct = products[csvProduct.id];
      const richProduct = populateMissedProps(oldProduct, product);
      products[csvProduct.id] = richProduct;
    }
  }

  return Object.values(products);
};

const packageMapper = (packageType: string): Packaging => {
  switch (packageType) {
    case JsonPackaging.bottle:
      return Packaging.BO;
    case JsonPackaging.box:
      return Packaging.BX;
    case JsonPackaging.case:
      return Packaging.CA;
  }
  if (packageType.includes('case')) {
    return Packaging.CA;
  } if (packageType.includes('box')) {
    return Packaging.BX;
  } if (packageType.includes('single')) {
    return Packaging.BO;
  }
};

const baseProductPackageMapper = (baseProductPackage: string): BaseProductPackaging => {
  switch (baseProductPackage) {
    case JsonBaseProductPackaging.bottle:
      return BaseProductPackaging.BO;
    case JsonBaseProductPackaging.can:
      return BaseProductPackaging.CN;
    case CsvBaseProductPackaging.bottle:
      return BaseProductPackaging.BO;
    case CsvBaseProductPackaging.can:
      return BaseProductPackaging.CN;
    default:
      return;
  }
};

const populateMissedProps = (oldProduct: Product, csvProduct: Product) : Product => {
  const richProduct: Product = {
    id: oldProduct.id,
    gtin: oldProduct.gtin !== undefined ? oldProduct.gtin : csvProduct.gtin,
    manufacturer: oldProduct.manufacturer !== undefined ?
      oldProduct.manufacturer : csvProduct.manufacturer,
    name: oldProduct.name !== undefined ? oldProduct.name : csvProduct.name,
    package: oldProduct.package !== undefined ? oldProduct.package : csvProduct.package,
    baseProductPackaging: oldProduct.baseProductPackaging !== undefined ?
      oldProduct.baseProductPackaging : csvProduct.baseProductPackaging,
    baseProductUnit: oldProduct.baseProductUnit !== undefined ?
      oldProduct.baseProductUnit : csvProduct.baseProductUnit,
    baseProductAmount: oldProduct.baseProductAmount !== undefined ?
      oldProduct.baseProductAmount : csvProduct.baseProductAmount,
    baseProductQuantity: oldProduct.baseProductQuantity !== undefined ?
      oldProduct.baseProductQuantity : csvProduct.baseProductQuantity,
  };

  return richProduct;
};
