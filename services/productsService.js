const ProductsModel = require('../models/productsModel');
const ProductsValidation = require('../middlewares/productsValidation');
const { validationId } = require('../middlewares/idValidation');

const create = async (name, quantity) => {
    const validation = await ProductsValidation(name, quantity);
    if (validation !== true) {
        return validation;
    }
    
    const isValid = await ProductsModel.create(name, quantity);
    return isValid;
};

const getAll = async () => ProductsModel.getAll();

const getById = async (id) => {
    const validate = validationId(id);

    if (validate !== true) {
        return validate;
    }

    return ProductsModel.getById(id);
};

const updateById = async (id, name, quantity) => {
    const validate = await ProductsValidation(name, quantity);

    if (validate !== true) {
        return validate;
    } 
    const result = await ProductsModel.updateById(id, name, quantity);
    return result;
};

const deleteById = async (id) => {
    try {
        const dontExist = await ProductsModel.getById(id);
        const validate = validationId(id);
        if (dontExist.length === 0 || validate.err) {
            return ({ err: { code: 'invalid_data', message: 'Wrong id format' } });
        }
        await ProductsModel.deleteById(id);
        return (dontExist);
    } catch (error) {
        return ({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
};

module.exports = { create, getAll, getById, updateById, deleteById };
