import express from 'express';
import { getProducts } from '../controllers';

const productsRouter = express.Router();

/* GET products listing. */
productsRouter.get('/', getProducts);

export default productsRouter;
