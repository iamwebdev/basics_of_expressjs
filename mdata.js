var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:  {type: String},
    age: {type: Number}
});

userSchema.methods.getMyName = function() {
    console.log(this.name)
}

var userModel = mongoose.model('User', userSchema);

var users = new userModel({
    name:'Amrit',
    age: 25
});

users.getMyName()