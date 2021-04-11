const { User, Thought } = require('../models');

// get all thoughts 
module.exports.getAllThoughts =  async ({ body }, res) => {
    try {
        const dbThoughtData = await Thought.find({}).select('-__v');
        res.json(dbThoughtData);
    } catch (err) {
        res.sendStatus(400);
    }
};

// get thought by id 
module.exports.getThoughtById =  async ({ params }, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: params.id }).select('-__v');
        
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        
        res.json(dbThoughtData);
    } catch (err) {
        res.sendStatus(400);
    }
};

// create new thought
module.exports.createThought =  async ({ body }, res) => {
    // Expected body format:
    //{
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }

    try {
        // create a thought item from body data
        const { _id } = await Thought.create({
            thoughtText: body.thoughtText,
            username: body.username
        });

        // push the newly created thought item to correponding user data
        const dbUserData = await User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this userId!' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        err => res.json(err)
    }
};

// update thought by id
module.exports.updateThought = async ({ params, body }, res) => {
    // Expected body content:
    
    try{
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        );
        
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        err => res.json(err);
    }
};

// delete user by id
module.exports.deleteThought = async ({ params }, res) => {
    try{
        const dbThoughtData = await Thought.findOneAndDelete(
            { _id: params.id }
        );
        
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        err => res.json(err);
    }
};


// add a reaction
module.exports.addReaction = async ({ params, body }, res) => {
    // Expected body format:
    // {
    //   "reactionBody": "This is my reaction!!!",
    //   "username": "lernantino"
    // }
    try {
        const { thoughtId } = params;
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        );

        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        err => res.json(err);
    }
};

// remove a reaction by id
module.exports.removeReaction = async ({ params }, res) => {
    try {
        const { thoughtId, reactionId } = params;
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId }  } },
            { new: true }
        );

        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        err => res.json(err);
    }
};