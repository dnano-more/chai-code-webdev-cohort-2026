import * as authService from "./auth.service.js"
import apiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
    const user = await authService.register(req.body)
    apiResponse.created(res, "Registration success", user)
}

const login = async (req, res) => {
    const {user, accessToken, refreshToken} = await authService.login(req.body)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    apiResponse.ok(res, "Login successfull", {user, accessToken});
}

const logout = async (req, res) => {
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })
    apiResponse.ok(res, "Logout Success")
}

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw ApiError.unauthorized("Refresh token missing");
  }

  const data = await authService.refresh(token);
  apiResponse.ok(res, "Token refreshed", data);
};

const verifyEmail = async (req, res) => {
    const user = await authService.verifyEmail(req.body.token)
    apiResponse.ok(res, "Email verified successfully", user)
}

const getMe = async(req, res) => {
    const user = await authService.getMe(req.user.id);
    apiResponse.ok(res, "User Profile", user)
}

export {register, login, logout, refresh, verifyEmail, getMe}