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
router.post('/roomdetails/save', upload.fields([{ name: 'roomImage', maxCount: 1 }, { name: 'room3dview', maxCount: 1 }]), async (req, res) => {
  try {
    const { roomno, roomname, roomdetails, roomprice, size, adults, child, roomservices } = req.body;
    const roomImage = req.files['roomImage'] ? `/uploads/${req.files['roomImage'][0].filename}` : null;
    const room3dview = req.files['room3dview'] ? `/uploads/${req.files['room3dview'][0].filename}` : null;

    const newPost = new Posts({
      roomno,
      roomname,
      roomdetails,
      roomprice,
      size,
      adults,
      child,
      roomservices,
      roomimage: roomImage,
      room3dview: room3dview,
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

// Update post
router.put('/roomdetails/update/:id', upload.fields([{ name: 'roomImage', maxCount: 1 }, { name: 'room3dview', maxCount: 1 }]), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.files['roomImage']) {
      updatedData.roomimage = `/uploads/${req.files['roomImage'][0].filename}`;
    }
    if (req.files['room3dview']) {
      updatedData.room3dview = `/uploads/${req.files['room3dview'][0].filename}`;
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

/*
// Save post 
router.post('/roomdetails/save', upload.single('roomImage'), async (req, res) => {
  try {
    const { roomno, roomname, roomdetails, roomprice,size,adults,child,roomservices } = req.body;
    const roomImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Posts({
      roomno,
      roomname,
      roomdetails,
      roomprice,
      size,
      adults,
      child,
      roomservices,
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
*/
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

/*
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
*/
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
