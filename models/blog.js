const mongoose =require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    author: {
      type: String,
      trim: true,    
      required: true
    },
    content: {
      type: String,
      trim: true,
      required: true
    }
  },
  { timestamps: true,versionKey:false }
);

const User = mongoose.model("Blog", userSchema);
module.exports = User;
