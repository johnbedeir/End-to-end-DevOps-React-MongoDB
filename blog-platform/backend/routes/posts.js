const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const router = express.Router();
const Post = require('../models/Post'); // Import your Post model


// Initialize AWS S3 Client
const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

// Multer setup for memory storage (since we're uploading to S3)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint to create a new blog post

router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const file = req.file;
      const filename = `uploads/${Date.now()}-${file.originalname}`;

      // Prepare the upload parameters
      const uploadParams = {
        Bucket: "blog-platform-app-uploads", // Ensure this is set in your environment variables
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Uncomment if your bucket policy allows public uploads
      };

      // Perform the upload to S3
      const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

      // Construct the image URL or use uploadResult as needed
      imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    }

    // The rest of your logic to save the post to your database, etc.
  } catch (error) {
    console.error('Error uploading to S3 or saving post:', error);
    res.status(500).json({ message: error.message });
  }
});

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     let imageUrl = '';
//     if (req.file) {
//       const file = req.file;
//       // Generate a unique file name
//       const filename = `uploads/${Date.now()}-${file.originalname}`;

//       // Prepare the upload parameters
//       const uploadParams = {
//         Bucket: "blog-platform-app-uploads",
//         Key: filename,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: 'public-read', // or another ACL according to your requirements
//       };

//       // Perform the upload to S3 and capture the result
//       const uploadResult = await s3.send(new PutObjectCommand(uploadParams));
//       imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

//       // Upload the image to S3
//       await s3Client.send(new PutObjectCommand(uploadParams));

//       // Optionally get a signed URL for the uploaded object
//       const url = await getSignedUrl(s3Client, new PutObjectCommand({
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: filename,
//       }), { expiresIn: 3600 }); // URL expires in 1 hour

//       imageUrl = url; // Or directly use the S3 object URL if public access is configured
//     }

//     // Create a new post with the image URL
//     const newPost = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       image: imageUrl, // Use the signed URL or the direct S3 URL
//     });

//     await newPost.save(); // Save the post to the database

//     res.status(201).json(newPost); // Send back the saved post
//   } catch (error) {
//     console.error('Error uploading to S3 or saving post:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// GET endpoint to fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.json(posts); // Send back the fetched posts as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send back the error if any
  }
});

module.exports = router;
