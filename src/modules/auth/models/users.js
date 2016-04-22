import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs';

const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

UsersSchema.pre('save', function (next) {
    if(!this.isNew || !this.isModified('password')) {
       return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
});

UsersSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    })
};

export default mongoose.model('auth_user', UsersSchema);