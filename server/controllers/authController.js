const User = require("../models/User");
const { signToken } = require("../utils/token");

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: signToken({ id: user._id.toString() }),
    user: formatUser(user),
  });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password });
    sendAuthResponse(res, 201, user);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.matchPassword(password)) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    sendAuthResponse(res, 200, user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = (req, res) => {
  res.status(200).json({ success: true, user: formatUser(req.user) });
};

module.exports = { signup, login, getMe };
