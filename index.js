const express = require('express');
const error = require('./middlewares/error');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(error);

// GET'S:

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAll);
app.get('/sales', SalesController.getAll);
app.get('/products/:id', ProductsController.getById);
app.get('/sales/:id', SalesController.getById);

// POST'S:

app.post('/products', ProductsController.create);
app.post('/sales', SalesController.create);

// PUT'S:

app.put('/products/:id', ProductsController.updateById);
app.put('/sales/:id', SalesController.updateById);

// DELETE'S:

app.delete('/products/:id', ProductsController.deleteById);
app.delete('/sales/:id', SalesController.deleteById);

app.listen(PORT, () => console.log(`App is running in port ${PORT}`));
