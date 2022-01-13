const { ObjectId } = require('mongodb');
const { connection } = require('./connection');
/*
const create = async (sale) => {
    connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...sale] }))
    .then((result) => (result.ops[0]));
};
*/
const create = async (sale) => {
    const DB = await connection();
    const response = await DB
    .collection('sales')
    .insertOne({ itensSold: [...sale] });
    return {
        _id: response.insertedId,
        itensSold: [...sale],
    };
};

const getAll = async () => {
    const DB = await connection();
    const response = await DB
    .collection('sales')
    .find().toArray();
    return response;
};

const getById = async (id) => {
    const DB = await connection();
    const response = await DB
    .collection('sales')
    .find({ _id: ObjectId(id) }).toArray();
    return response[0];
};
// updateById ajustes finais com ajuda de Bruno e Kevin
const updateById = async (id, sale) => {
    const DB = await connection();
    await DB
    .collection('sales')
    .updateOne({ _id: ObjectId(id) },
    {
        $set: sale,
            
        });
    return ({ _id: id, ...sale });
};

const deleteById = async (id) => {
    const DB = await connection();
    const response = await DB
    .collection('sales')
    .deleteOne({ _id: ObjectId(id) });
    return response;
};

module.exports = { create, getAll, getById, updateById, deleteById };
