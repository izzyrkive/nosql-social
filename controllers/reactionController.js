const { Reaction } = require('../models');

const reactionController = {
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const newReaction = await Reaction.create({
        reactionBody,
        username,
        thoughtId
      });

      await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction._id } },
        { new: true }
      );

      res.status(200).json(newReaction);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: reactionId } },
        { new: true }
      );

      await Reaction.findByIdAndDelete(reactionId);

      res.status(200).json({ message: 'Reaction deleted successfully.' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = reactionController;