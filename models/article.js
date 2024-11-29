const mongoose = require("mongoose");
// const user = require("")

const schemaObj = {
    title: {type: String, required: true},
    topic: {type: String, required: true},
    author: {type: String, required: true},
    creationDate: {type: Date},
    content: {type: String, required: true}
    }
const mongooseSchema = mongoose.Schema(schemaObj);
module.exports = mongoose.model("Article", mongooseSchema);