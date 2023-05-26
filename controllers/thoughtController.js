const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const newThought = await Thought.create({
        thoughtText,
        username,
        userId
      });

      await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.status(200).json(newThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateThought: async (req, res) => {
    try {
      const { thoughtText } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { thoughtText },
        { new: true }
      );

      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      await User.findByIdAndUpdate(
        deletedThought.userId,
        { $pull: { thoughts: deletedThought._id } },
        { new: true }
      );

      res.status(200).json({ message: 'Thought deleted successfully.' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = thoughtController;