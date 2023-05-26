const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = await User.create({ username, email });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const friendController = {
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = {
  userController,
};





