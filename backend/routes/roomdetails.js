const express = require('express');
const multer = require('multer');
const Posts = require('../models/roomdetails');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage });

// Save post 
router.post('/roomdetails/save', upload.single('roomImage'), async (req, res) => {
  try {
    const { roomno, roomname, roomdetails, roomprice } = req.body;
    const roomImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Posts({
      roomno,
      roomname,
      roomdetails,
      roomprice,
      roomimage: roomImage,
    });

    await newPost.save();
    return res.status(200).json({
      success: "Post saved successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

// Get posts
router.get('/roomdetails', async (req, res) => {
  try {
    const posts = await Posts.find().exec();
    return res.status(200).json({
      success: true,
      existingPosts: posts
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

// Update post
router.put('/roomdetails/update/:id', upload.single('roomImage'), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.roomimage = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    return res.status(200).json({
      success: "Post updated successfully",
      data: updatedPost
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
});

// Delete post
router.delete('/roomdetails/delete/:id', async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id).exec();

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.json({
      message: "Delete successful",
      deletedPost
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message
    });
  }
});



// Serve the uploads directory statically
router.use('/uploads', express.static('uploads'));

module.exports = router;
