import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    text: {
      type: String,
      require:true
    }

  },
  { timestamps: true }
);

const Usertodo = model("todotanstack", userSchema);

// module.exports = User;
export default Usertodo;