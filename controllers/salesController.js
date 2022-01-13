const SalesService = require('../services/salesService');

const create = async (req, res, next) => {
    try {
        const salesArray = req.body;

        const sale = await SalesService.create(salesArray);

        if (('err' in sale)) return res.status(422).json(sale);

        return res.status(200).json(sale);
    } catch (error) {
        next(error);
    }
};

const getAll = async (_req, res, next) => {
    try {
        const allSales = await SalesService.getAll();
    
        if (allSales) return res.status(200).json({ sales: allSales });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    const message = {
        code: 'not_found', message: 'Sale not found',
    };

    try {
        const { id } = req.params;
        const sale = await SalesService.getById(id);
        if (('err' in sale)) return res.status(404).json({ err: message });
        return res.status(200).json(sale);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sale = [...req.body];
        const sales = await SalesService.updateById(id, sale);
        if (('err' in sales)) return res.status(422).json(sales);
        return res.status(200).json(sales);
} catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sale = await SalesService.deleteById(id);
        if ('err' in sale) return res.status(422).json(sale);

        return res.status(200).json(sale);
    } catch (error) {
        next(error);
    }
};

module.exports = { create, getAll, getById, updateById, deleteById };
