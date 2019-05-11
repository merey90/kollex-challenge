import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';

import products from './modules/product/routes';

const app = express();
const port = 5000; // default port to listen

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Routers
app.use('/products', products);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ port }`);
});

module.exports = app;
