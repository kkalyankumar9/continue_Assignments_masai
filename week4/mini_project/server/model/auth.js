const mongoose =require("mongoose");

const authSchema= new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    versionKey: false,
    timestamps: true
})
const AuthModel = mongoose.model("users", authSchema);

module.exports = { AuthModel };