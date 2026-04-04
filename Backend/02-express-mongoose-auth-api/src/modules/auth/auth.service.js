import { sendVerificationEmail } from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js"
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js"
import User from "./auth.model.js"

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const register = async ({name, email, password, role}) => {
    
    const existing = await User.findOne({email})
    if(existing) throw ApiError.conflict("Email already exists")
    
    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role,
        varificationToken: hashedToken
    })

    //TODO: send an email to user with token: rawToken
    try {
        await sendVerificationEmail(email, token)
    } catch (error) {
       console.error("Error sending verification email", error); 
    }

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.varificationToken
        
    return userObj
}

const login = async ({email, password}) => {
    // take email and find user in DB
    // then check if password is correct
    // check if verified or not

    const user = await User.findOne({email}).select("+password")
    if(!user) throw ApiError.unauthorized("Invalid Email or Password")

    // somehow I will check password
    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw ApiError.unauthorized("Invalid email or password")

    if(!user.isVerified) {
        throw ApiError.forbidden("Please verify your email before login")
    }

    const accessToken = generateAccessToken({id: user._id, role: user.role})
    const refreshToken = generateRefreshToken({id: user._id})

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave: false})

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken
    
    return {user: userObj, accessToken, refreshToken}
}

const refresh = async () => {
    if(!token) throw ApiError.unauthorized("Refresh token missing")
        const decoded = verifyRefreshToken(token)
    
    const user = await User.findById(decoded.id).select("+refreshToken");
    if(!user) throw ApiError.unauthorized("User not found")
        
    if(user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token")
    }
        
    const accessToken = generateAccessToken({id: user._id, role: user.role})
    const refreshToken = generateRefreshToken({id: user._id})
        
    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave: false})
        
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return {user: userObj, accessToken, refreshToken};
}

const logout = async (userId) => {
    // const user = await User.findById(userId);
    // if (!user) throw ApiError.unauthorized("User not found");

    // user.refreshToken = undefined;
    // await user.save({ validateBeforeSave: false });

    await User.findByIdAndUpdate(userId, {refreshToken: null})
}

const forgotPassword = async (email) => {
    const user = await User.findOne({email})
    if(!user) throw ApiError.notfound("No account with that email")

    const {rawToken, hashedToken} = generateResetToken()
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000

    await user.save();

    //TODO: mail bhejo
}

const resetPassword = async (token, newPassword) => {
    const hashedToken = hashToken(token)
    const user = await User.findOne({resetPasswordToken: hashedToken, resetPasswordExpires: {$gt: Date.now()}})
    if(!user) throw ApiError.badRequest("Invalid or expired token") 

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()   
}

const verifyEmail = async (token) => {
    const hashedToken = hashToken(token);
    const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpires: { $gt: Date.now() }
    }).select("+verificationToken");

    if(!user) throw ApiError.badRequest("Invalid or expired token");

    if (user.isVerified) {
        throw ApiError.badRequest("User already verified");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
    
    return user;
}

const getMe = async (userId) => {
    const user = User.findById(userId);
    if(!user) throw ApiError.notfound("User not found");
    return user;
}
    
export {register, login, refresh, logout, forgotPassword, resetPassword, verifyEmail, getMe}