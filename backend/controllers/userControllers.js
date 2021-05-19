import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/genToken.js';
import { validationResult } from 'express-validator';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Auth GOOGLE user & get token
// @route   POST /api/users/loginGoogle
// @access  Public
const authGoogleUser = asyncHandler(async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_JWT_SECRET);
  const { googleToken } = req.body;

  const decoded = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_JWT_SECRET,
  });
  const { email_verified, name, email, picture } = decoded.payload;

  if (email_verified) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.json({
        _id: userExists._id,
        name,
        email,
        avatar: picture,
        isAdmin: userExists.isAdmin,
        token: generateToken(userExists._id),
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: email + process.env.GOOGLE_JWT_SECRET,
      avatar: picture,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name,
        email,
        avatar: picture,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

// @desc    Auth FACEBOOK user & get token
// @route   POST /api/users/loginFacebook
// @access  Public
const authFacebookUser = asyncHandler(async (req, res) => {
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/${userID}?fields=name,email,picture&access_token=${accessToken}`;
  const { data } = await axios.get(url);
  const { name, email, picture } = data;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({
      _id: userExists._id,
      name,
      email,
      avatar: picture.data.url,
      isAdmin: userExists.isAdmin,
      token: generateToken(userExists._id),
    });
  }

  const newUser = await User.create({
    name,
    email,
    password: email + email.length.toString(),
    avatar: picture.data.url,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name,
      email,
      avatar: picture.data.url,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMessages = errors.array().map((obj) => obj.msg);

    res.status(400);
    throw new Error(errMessages[0]);
  }

  const { name, email, password, avatar } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({});
  const users = await User.find({})
    .select('-password')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  authGoogleUser,
  authFacebookUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
