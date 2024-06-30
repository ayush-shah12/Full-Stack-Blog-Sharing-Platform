const mongoose = require("mongoose")
const { Schema, model } = mongoose;

//defines schema for how data passed will be formatted in the database
const UserSchema = Schema({
    user: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
})

const UserModel = model("User", UserSchema);

module.exports = UserModel;