const { getByName } = require('../models/productsModel');

const errorsCode = [
    { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    { code: 'invalid_data', message: '"quantity" must be a number' },
    { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    { code: 'invalid_data', message: 'Product already exists' },
];

const ProductsValidation = async (name, quantity) => {
    const validateName = name.length >= 5;

    const validateQuantity = quantity > 0;

    const validadeTypeOfQuantity = typeof quantity === 'string';

    const validadeProductExists = await getByName(name);

    if (!validateName) return errorsCode[0];
    if (validadeTypeOfQuantity) return errorsCode[1];
    if (!validateQuantity) return errorsCode[2];
    if (validadeProductExists.length > 0) return errorsCode[3];

    return true;
};

module.exports = ProductsValidation;
