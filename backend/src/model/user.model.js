// import md5 from "md5";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    select: false,
  },
  avatar: {
    type: String,
    required: false,

    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
    // default: function () {
    //   return getGravatarUrl(this.email);
    // },
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// function getGravatarUrl(email, size = 200, defaultType = "identicon") {
//   const base = "https://www.gravatar.com/avatar/";
//   const hash = md5(email.trim().toLowerCase());
//   return `${base}${hash}?s=${size}&d=${defaultType}`;
// }

export const User = mongoose.model("User", userSchema);
