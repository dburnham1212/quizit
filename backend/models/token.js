// Initializations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model("Token", tokenSchema, "tokens");
module.exports = Token;
