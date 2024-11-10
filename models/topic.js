const mongoose = require("mongoose");
const schemaObj = {
    name: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type:Date}
}
const mongooseSchema = mongoose.Schema(schemaObj);
module.exports = mongoose.model("Topic", mongooseSchema);