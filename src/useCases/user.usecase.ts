import { UserRepositoryPrisma } from '../repositories/user.repository.ts';
import { hashPassword } from '../utils/hash.ts';
import { User, UserCreate, UserRepository } from './../interfaces/userInterface.ts';

// aqui fica a logica de negocios
class UserUserCase {
	private UserRepository: UserRepository;
	constructor() {
		this.UserRepository = new UserRepositoryPrisma
	}
	async create({ name, sap, password }: UserCreate): Promise<User> {
		const hashedPassword = await hashPassword(password)
		const user = await this.UserRepository.createUser({ name, sap, password: hashedPassword })
		return user;
	}
}

export { UserUserCase };
