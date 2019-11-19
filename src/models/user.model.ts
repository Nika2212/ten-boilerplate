import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    email: {
        type: String,
        required: 'Enter a email'
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, name: this.name }, process.env.SERVER_KEY);
}

export const User = mongoose.model('User', UserSchema);
