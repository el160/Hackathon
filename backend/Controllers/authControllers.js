const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Controller for user authentication
const authController = {
  // Register a new user
  registerUser: async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Login a user
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Logout a user
  logoutUser: (req, res) => {
    // Invalidate token on frontend by clearing storage (handled client-side)
    res.status(200).json({ message: "Logout successful" });
  },
};

module.exports = authController;
