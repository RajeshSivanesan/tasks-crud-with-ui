//@ts-nocheck
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0, 
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens : [{
        token : {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens;

    return userObject
}

userSchema.methods['generateAuthToken'] = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, config.jwt.secret)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

userSchema.statics['findByCredentials'] = async (email, password) => {
    const user = await User.findOne({email})
    
    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plane text password before saving
userSchema.pre('save', async function (next){
    const user = this

    if(user.isModified('password') ) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('Users', userSchema)

export default User