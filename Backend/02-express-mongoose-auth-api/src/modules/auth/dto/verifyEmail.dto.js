import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class VerifyEmailDto extends BaseDto {
    static schema = Joi.object({
        token: Joi.string().trim().min(10).required()
    })
}

export default VerifyEmailDto;