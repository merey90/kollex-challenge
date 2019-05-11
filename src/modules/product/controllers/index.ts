import { readFromFile } from '../util/readFromFile';
import { DataType } from '../../../models/util';

export const getProducts = async (req, res, next) => {
  let products = ['respond with a resource'];
  products = await readFromFile(DataType.JSON);

  res.send(products);
};
