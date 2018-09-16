var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
    image: String,
    title: String, 
    header: String, 
    body: String,
    dateCreated: Date,
    category: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;