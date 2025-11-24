const User = require('../models/users');

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const { email, username, name, ipaddress } = req.body;

        if (!email || !username || !name || !ipaddress) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newUser = new User({ email, username, name, ipaddress });
        const result = await newUser.save();
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const result = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!result) return res.status(404).json({ message: "User not found" });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "User not found" });

        res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};