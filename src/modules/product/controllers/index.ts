import { readFromFile } from '../util/readFromFile';
import { getMappedData } from '../util/getMappedData';

export const getProducts = async (req, res, next) => {
  const products = await getMappedData();
  res.send(products);
};
