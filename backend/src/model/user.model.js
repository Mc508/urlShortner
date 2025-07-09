import md5 from "md5";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: function () {
      return getGravatarUrl(this.email);
    },
  },
});

function getGravatarUrl(email, size = 200, defaultType = "identicon") {
  const base = "https://www.gravatar.com/avatar/";
  const hash = md5(email.trim().toLowerCase());
  return `${base}${hash}?s=${size}&d=${defaultType}`;
}

export const User = mongoose.model("User", userSchema);
