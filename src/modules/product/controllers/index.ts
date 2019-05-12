import { Response, NextFunction, Request } from 'express';

import { getMappedData } from '../util/getMappedData';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getMappedData();
  res.send(products);
};
