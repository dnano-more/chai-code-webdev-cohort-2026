import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"]  // it means that if the name is not provided, it will throw an error with the message "Name is required"
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {type: String, select: false},
    refreshToken: {type: String, select: false},
    resetPasswordToken: {type: String, select: false},
    resetPasswordExpires: {type: Date, select: false}
}, {timestamps: true});

export default mongoose.model("User", userSchema)