import { User, UserCreate, UserRepository } from '../interfaces/userInterface.ts';
import { UserRepositoryPrisma } from '../repositories/user.repository.ts';
import { hashPassword } from '../utils/hash.ts';

// aqui fica a logica de negocios
class UserUseCase {
	private UserRepository: UserRepository;
	constructor() {
		// aqui fica a instancia da UserRepositoryPrisma que vai ser usada para interagir com o banco de dados
		this.UserRepository = new UserRepositoryPrisma
	}
	async create({ name, sap, password }: UserCreate): Promise<User> {
		const hashedPassword = await hashPassword(password)
		const verifyUser = await this.UserRepository.findBySap(sap)
		if (verifyUser) {
			// caso o usuario ja exista, lança uma exceção com a mensagem "User already exists"	
			throw new Error('User already exists')
		}
		const user = await this.UserRepository.createUser({ name, sap, password: hashedPassword })
		return user;
	}
}

export {  UserUseCase };

