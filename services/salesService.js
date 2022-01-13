const SalesModel = require('../models/salesModel');
const { salesValidation } = require('../middlewares/salesValidation');
const { validationId } = require('../middlewares/idValidation');

const create = async (salesArray) => {
    const validation = await salesValidation(salesArray);

    if (validation !== true) {
        return validation;
    }
    const isValid = await SalesModel.create(salesArray);
    return isValid;
};

const getAll = async () => SalesModel.getAll();

const getById = async (id) => {
    const validate = validationId(id);

    if (validate !== true) {
        return validate;
    }
    const result = await SalesModel.getById(id);
    if (result) {
        return result;
    }

    return { err: '' };
};

const updateById = async (id, sale) => {
    const validate = await salesValidation(sale);

   if (validate !== true) {
       return validate;
   } 
   return SalesModel.updateById(id, { itensSold: sale });
};

const deleteById = async (id) => {
    try {
        const dontExist = await SalesModel.getById(id);
        const validate = validationId(id);
        if (dontExist.length === 0 || validate.err) {
            return ({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
        }
        await SalesModel.deleteById(id);
        return (dontExist);
    } catch (error) {
        return ({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
    }
};

module.exports = { create, getAll, getById, updateById, deleteById };
