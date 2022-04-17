import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository") private userRepository: IUsersRepository,
    ) {}

    async execute(user: ICreateUserDTO): Promise<void> {
        await this.userRepository.create(user);
    }
}

export { CreateUserUseCase };
