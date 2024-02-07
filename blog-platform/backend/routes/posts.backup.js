// const express = require('express');
// const multer = require('multer');
// const path = require('path'); // Import the path module
// const router = express.Router();
// const Post = require('../models/Post'); // Import your Post model

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Ensure this uploads directory exists in your project
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // POST endpoint to create a new blog post
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const newPost = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       image: req.file ? req.file.filename : '', // Store the filename of the uploaded image
//       // Other fields can be added as needed
//     });

//     await newPost.save(); // Save the post to the database

//     res.status(201).json(newPost); // Send back the saved post
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find(); // Fetch all posts from the database
//     res.json(posts); // Send back the fetched posts as JSON
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // Send back the error if any
//   }
// });

// module.exports = router;
