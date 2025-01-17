import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {type: String,required: true},
    employerId: {type: String, required: true},
    role: {type: String,required: true,enum:['Admin','superAdmin'],default: "Admin"},
    password: {type: String,required: true}
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model('User',userSchema)