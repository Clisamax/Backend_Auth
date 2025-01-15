import { FastifyInstance } from 'fastify';
import { User, UserCreate, UserRepository } from '../interfaces/userInterface.ts';
import { UserRepositoryPrisma } from '../repositories/user.repository.ts';
import { hashPassword } from '../utils/hash.ts';
import { verifyPassword } from '../utils/hash.ts';




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

	async login(sap: string, password: string): Promise<User | null> {
		const user = await this.UserRepository.findBySap(sap)
		if (!user) {
			return null
		}
		const isValidPassword = await verifyPassword(password, user.password)
		if (!isValidPassword) {
      return null
    }
		return user
		
	}
	async delete(id: string): Promise<User | null> {
		const user = await this.UserRepository.findBySap(id)
		if (!user) {
			return null
		}
		await this.UserRepository.deleteUser(id)
		return user
	}
	async update(id: string, data: UserCreate): Promise<User | null> {
		const user = await this.UserRepository.findBySap(id)
		if (!user) {
			return null
		}
		const updatedUser = await this.UserRepository.createUser(data)
		return updatedUser
	}
	
}

export {  UserUseCase };

