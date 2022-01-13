const ProductService = require('../services/productsService');
// aqui vamos pegar do requerer do body a info do service e enviar uma resposta ao cliente
const create = async (req, res, next) => {
try {
    const { name, quantity } = req.body;

    const product = await ProductService.create(name, quantity);
// ajuda do Bruno Augusto na lógica desse if de retorno dos codes:
    if (('code' in product)) return res.status(422).json({ err: product });
    return res.status(201).json(product);
} catch (error) {
    next(error);
    }
};

const getAll = async (_req, res, next) => {
    try {
        const allProducts = await ProductService.getAll();
    
        if (allProducts) return res.status(200).json({ products: allProducts });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await ProductService.getById(id);
        if (('err' in products)) return res.status(422).json({ err: products.err });
        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const product = await ProductService.updateById(id, name, quantity);
        if (('code' in product)) return res.status(422).json({ err: product });
        return res.status(200).json(product);
} catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductService.deleteById(id);
        if ('err' in product) return res.status(422).json(product);

        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = { create, getAll, getById, updateById, deleteById };
