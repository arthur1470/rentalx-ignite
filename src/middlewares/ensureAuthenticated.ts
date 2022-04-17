import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    _response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Token missing.", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "9d60465e088c622d9296b1c9f2891f48",
        ) as IPayload;

        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);

        if (!user) throw new AppError("User does not exists.", 401);

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
