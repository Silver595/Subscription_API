
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
        name: {
            type: String, required: [true, 'Please enter a name'],
            trim: true,
            minLength: 5,
            maxLength: 15,
        },
        email: {
            type: String,
            required: [true,'Please enter a valid email'],
            trim: true,
            unique: true,
            lowercase: true,
            match:[/\S+@\S+\.\S+/,'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true,'Please enter 8 letter password'],
            minLength: 8,
        }
    },
    {timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;