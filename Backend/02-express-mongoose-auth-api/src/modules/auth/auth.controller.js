import * as authService from "./auth.service.js"
import apiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
    const user = await authService.register(req.body)
    apiResponse.created(res, "Registration success", user)
}

export {register}