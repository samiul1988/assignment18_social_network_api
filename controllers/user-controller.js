const { User, Thought } = require('../models');

// get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const dbUserData = await User.find({}).select('-__v');
        res.json(dbUserData);
    } catch (err) {
        res.sendStatus(400);
    }
};

// get a single user by id
module.exports.getUserById = async ({ params }, res) => {
    try {
        const dbUserData = await User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.json(dbUserData);
    } catch (err) {
        res.sendStatus(400);
    }
};

// create new user
module.exports.createUser = ({ body }, res) => {
    // Expected body content:
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    // }

    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
};

// update user by id
module.exports.updateUser = async ({ params, body }, res) => {
    // Expected body content:
    
    try{
        const dbUserData = await User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        );
        
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        err => res.json(err);
    }
};

// delete user by id
module.exports.deleteUser = async ({ params }, res) => {
    try{
        const dbUserData = await User.findOneAndDelete(
            { _id: params.id }
        );
        
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        // Delete associated thoughts
        const dbThoughtData = await Thought.deleteMany(
            {
                _id: {
                    $in: dbUserData.thoughts
                }
            }
        );

        res.json("User and associated thoughts deleted!");
    } catch (err) {
        err => res.json(err);
    }
};

// add a friend by id
module.exports.addFriend = async ({ params }, res) => {
    try {
        const { userId, friendId } = params;
        const dbUserData = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { friends: friendId } },
            { new: true }
        );

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        err => res.json(err);
    }
};

// remove a friend by id
module.exports.removeFriend = async ({ params }, res) => {
    try {
        const { userId, friendId } = params;
        const dbUserData = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        );

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        err => res.json(err);
    }
};