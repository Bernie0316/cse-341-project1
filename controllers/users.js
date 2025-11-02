const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

let nothing;

const getAll = (req, res) => {
    const db = mongodb.getDatabse();
    const usersCollection = db.db().collection('users');

    usersCollection.find().toArray()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Fetching users failed.' });
        });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabse().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    }).catch((err) => {
        res.status(500).json({ message: 'Fetching user failed.' });
    });
};

module.exports = { getAll, getSingle };