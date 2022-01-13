const { ObjectId } = require('mongodb');

const validationId = (id) => {
    if (!(ObjectId.isValid(id))) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        };
    }
    return true;
};

module.exports = { validationId };
