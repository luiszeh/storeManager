const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const create = async (name, quantity) => {
    const DB = await connection();
    const response = await DB
    .collection('products')
    .insertOne({ name, quantity });
    return {
        _id: response.insertedId,
        name,
        quantity,
    };
};

const getByName = async (name) => {
    const DB = await connection();
    const response = await DB
    .collection('products')
    .find({ name }).toArray();
    return response;
};

const getAll = async () => {
    const DB = await connection();
    const response = await DB
    .collection('products')
    .find().toArray();
    return response;
};

const getById = async (id) => {
    const DB = await connection();
    const response = await DB
    .collection('products')
    .find({ _id: ObjectId(id) }).toArray();
    return response[0];
};

const updateById = async (id, name, quantity) => {
    const DB = await connection();
    await DB
    .collection('products')
    .updateOne({ _id: ObjectId(id) },
    {
        $set: {
                name,
                quantity,
            },
        });
        // tratamento desse erro da camada model sugerido por DAVID GONZAGA para tratar a modificação no mongo:
        // if (!response.ok) throw new Error('Internal error');

    return ({ id, name, quantity });
};

const deleteById = async (id) => {
    const DB = await connection();
    const response = await DB
    .collection('products')
    .deleteOne({ _id: ObjectId(id) });
    return response;
};

module.exports = { create, getByName, getAll, getById, updateById, deleteById };
