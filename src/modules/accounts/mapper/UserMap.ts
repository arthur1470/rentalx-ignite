import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {
        return instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });
    }
}
