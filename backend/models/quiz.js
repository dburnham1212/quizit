// Initializations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const Quiz = mongoose.model("Quiz", quizSchema, "quizzes");
module.exports = Quiz;
