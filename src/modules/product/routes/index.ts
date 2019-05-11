import express from 'express';
import { getAllProducts } from '../controllers';

const productsRouter = express.Router();

/* GET products listing. */
productsRouter.get('/', getAllProducts);

export default productsRouter;
