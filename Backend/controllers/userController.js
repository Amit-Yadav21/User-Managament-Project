import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { createToken } from '../auth/authMiddleware.js';

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, mobile });

    
    // Save user to the database
    await user.save();
    
    // Generate token and set it to user object
    // const token = createToken(user);
    // user.token = token;
    // Set token in cookie and return response
    // res.cookie('token', token, { httpOnly: true });
    res.status(201).json({
      message: 'User registered successfully.',
      user: { name: user.name, email: user.email, mobile: user.mobile },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(400).json("Invalid Email. Please check.."); // Return to stop further execution
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (isMatch) {
      const token = createToken(userDetails)
      // res.cookie('token', token)
      return res.status(200).json({ message: "User login successfully..", userDetails, token });
    } else {
      return res.status(400).json("Invalid password.."); // Return here as well
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in' }); // Ensure this return too
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    if (req.user !== req.params.id) return res.status(403).json({ message: 'login user can update own data...' });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name, email, mobile,
          password: password ? await bcrypt.hash(password, 10) : undefined
        }
      },
      { new: true, omitUndefined: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    // Ensure the logged-in user is deleting their own account
    if (req.user !== req.params.id) {
      return res.status(403).json({ message: 'login user can delete own data...' });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser: { Name: deletedUser.name, Email: deletedUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Logout route
const logout = (req, res, next) => {
  try {
    // Ensure the logged-in user is logout their own account
    // if (!req.user) {
    //   return res.status(403).json({ message: 'user not logged IN. Login first...!' });
    // }

    // Clear the token cookie on the client side
    res.clearCookie('token');

    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    const err = new Error("Internal Server Error")
    err.status = 500;
    return next(err)
  }
};

export { registerUser, loginUser, getAllUsers, updateUser, deleteUser, logout };