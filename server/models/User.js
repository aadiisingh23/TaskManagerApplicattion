const crypto = require("crypto");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", function hashPassword(next) {
  if (!this.isModified("password")) return next();

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(this.password, salt, 100000, 64, "sha512").toString("hex");
  this.password = salt + ":" + hash;
  next();
});

userSchema.methods.matchPassword = function matchPassword(password) {
  const [salt, savedHash] = this.password.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");

  return crypto.timingSafeEqual(Buffer.from(savedHash, "hex"), Buffer.from(hash, "hex"));
};

module.exports = mongoose.model("User", userSchema);
