var mongoose = require("mongoose");
var passpoerLocalMongoose = require("passport-local-mongoose");
var userSchema = mongoose.Schema({
    username:String,
    password:String
})
userSchema.plugin(passpoerLocalMongoose);
module.exports = mongoose.model("User",userSchema);