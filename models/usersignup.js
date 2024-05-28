import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    id: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

// Automatically increment id field
userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }
  const lastUser = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
  if (lastUser) {
    this.id = lastUser.id + 1;
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
