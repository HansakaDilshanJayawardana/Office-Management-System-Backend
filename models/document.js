const {Schema, model} = require("../db/connection") // import Schema & model

// Document Schema
const DocumentSchema = new Schema({
    title: {//name of the file
        type: String,
        required: true
    },
    url: {//url to the file
        type: String,
        required: true
    },
    type: {//pdf, doc, docx, txt, etc
        type: String,
        required: true
    },
    size: {//size of the file in bytes
        type: Number,
        required: true
    },
    createdAt: {//date the file was created
        type: Date,
        default: Date.now
    },
    updatedAt: {//date the file was last updated
        type: Date,
        default: null
    },
    access: { //public, private, shared
        type: String,
        required: true
    },
    user: {//user who created the file
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

// Document model
const Document = model("Document", DocumentSchema)

module.exports = Document


