const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Ensures that the title field is mandatory
  },
  content: {
    type: String,
    required: true // Ensures that the content field is mandatory
  },
  image: {
    type: String,
    default: '' // Path or URL of the image, optional field
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets to the current date and time
  }
});

module.exports = mongoose.model('Post', PostSchema);
