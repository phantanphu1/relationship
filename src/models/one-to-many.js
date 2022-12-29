const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Categories = mongoose.model('Categories', categoriesSchema);

const commentsSchema = new mongoose.Schema({
  username: String,
  comment: String,
  rating: Number,
});

const Comments = mongoose.model('Comments', commentsSchema);

const tutorialsSchema = new mongoose.Schema({
  title: String,
  author: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
});

const Tutorials = mongoose.model('Tutorials', tutorialsSchema);

module.exports = { Categories, Comments, Tutorials };