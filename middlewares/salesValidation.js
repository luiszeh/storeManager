const ProductsModel = require('../models/productsModel');

const message = {
    IdOrQty: 'Wrong product ID or invalid quantity',
};

const verifyQuantity = (sale) => {
    if (sale.quantity <= 0 || typeof sale.quantity !== 'number') {
        return false;
    }
    return true;
};

const verifyProductId = async (sales) => {
    const checking = sales.every(async ({ productId }) => {
        const checkingId = await ProductsModel.getById(productId);
        return checkingId;
    });

    if (!checking) {
        return ({ err: {
            code: 'invalid_data',
            message: message.IdOrQty,
        } });
    }

    return true;
};

const salesValidation = async (sales) => {
    const verifyQtd = sales.find((sale) => verifyQuantity(sale) === false);

    if (verifyQtd !== undefined) {
        return ({
            err: { code: 'invalid_data', message: message.IdOrQty },
        });
    }

    const verifyProdId = await verifyProductId(sales);

    if (verifyProdId.err) {
        return verifyProdId;
    }

    return true;
};

module.exports = { salesValidation };
