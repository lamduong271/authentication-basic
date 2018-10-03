const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//create a Schema
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    }
});
userSchema.pre('save', async function(next) {
    //this.password
    try {
        //generate salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error)
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model
const User = mongoose.model('user',userSchema);

//export model
module.exports = User;