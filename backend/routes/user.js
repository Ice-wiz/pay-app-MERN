// Import necessary modules and files
const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Initialize express router
const router = express.Router();

// Define schema for signup request body using Zod
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

// Route for handling user signup
router.post("/signup", async (req, res) => {
  // Validate request body against schema
  const { success } = signupBody.safeParse(req.body);
  // If validation fails, return error response
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  // If user exists, return error response
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  // Create new user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // Extract user ID
  const userId = user._id;

  // Create account for new user with random balance
  const account = await Account.create({
    userId: user.id,
    balance: 1 + Math.random() * 10000,
  });

  // Generate JWT token for new user
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  // Return success response with token and account balance
  res.json({
    message: "User created successfully",
    token: token,
    balance: account.balance,
  });
});

// Define schema for signin request body using Zod
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// Route for handling user signin
router.post("/signin", authMiddleware, async (req, res) => {
  // Validate request body against schema
  const { success } = signinBody.safeParse(req.body);
  // If validation fails, return error response
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  // Authenticate user
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  // If user is found, generate and return JWT token
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  // If authentication fails, return error response
  res.status(411).json({
    message: "Error while logging in",
  });
});

// Define schema for update request body using Zod
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

// Route for handling user details update
router.put("/", authMiddleware, async (req, res) => {
  // Validate request body against schema
  const { success } = updateBody.safeParse(req.body);
  // If validation fails, return error response
  if (!success) {
    return res.status(411).json({
      message: "Error updating details",
    });
  }
  // Update user details
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.status(200).json({
    message:"User details successfully updated"
  });
});

// Route for fetching users in bulk based on filter
router.get("/bulk", async (req, res) => {
  // Get filter from query params, default to empty string if not provided
  const filter = req.query.filter || "";

  // Find users matching the filter
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  // Return filtered users
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});

// Export the router
module.exports = router;
