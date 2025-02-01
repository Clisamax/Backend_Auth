import { User, UserCreate, UserRepository, UserUpdate } from '../interfaces/userInterface.ts';
import { UserRepositoryPrisma } from '../repositories/user.repository.ts';
import { hashPassword, verifyPassword } from '../utils/hash.ts';




// aqui fica a logica de negocios
class UserUseCase {
	findBySap(sap: string) {
		throw new Error("Method not implemented.");
	}
	private UserRepository: UserRepository;
	constructor() {
		// aqui fica a instancia da UserRepositoryPrisma que vai ser usada para interagir com o banco de dados
		this.UserRepository = new UserRepositoryPrisma
	}
	async create({ name, sap, password }: UserCreate): Promise<User> {
		const hashedPassword = await hashPassword(password)
		const verifyUser = await this.UserRepository.findBySeach(sap)
		if (verifyUser) {
			// caso o usuario ja exista, lança uma exceção com a mensagem "User already exists"	
			throw new Error('Este usuário já existe')
		}
		const user = await this.UserRepository.createUser({ name, sap, password: hashedPassword })
		return user;
	}

	async login(sap: string, password: string): Promise<User | null> {
		const user = await this.UserRepository.findBySeach(sap)
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
		try {
			// Primeiro verifica se o usuário existe
			const user = await this.UserRepository.findById(id)
			if (!user) {
				throw new Error('Usuário não encontrado')
			}

			// Se existir, tenta deletar
			try {
				const deletedUser = await this.UserRepository.deleteUser(user.id)
				return deletedUser
			} catch (error) {
				throw new Error('Erro ao deletar usuário')
			}
		} catch (error) {
			console.error('Erro ao deletar usuário:', error)
			throw error
		}
	}
	async update(id: string, data: UserUpdate): Promise<User | null> {
		try {
			// Verifica se o usuário existe
			const existingUser = await this.UserRepository.findById(id)
			if (!existingUser) {
				throw new Error('Usuário não encontrado')
			}

			// Se estiver atualizando o SAP, verifica se já existe
			if (data.sap && data.sap !== existingUser.sap) {
				const userWithSap = await this.UserRepository.findBySeach(data.sap)
				if (userWithSap) {
					throw new Error('SAP já está em uso')
				}
			}

			// Hash a senha se ela for fornecida
			if (data.password) {
				data.password = await hashPassword(data.password)
			}

			const updatedUser = await this.UserRepository.updateUser(id, data)
			if (!updatedUser) {
				throw new Error('Erro ao atualizar usuário')
			}

			return updatedUser
		} catch (error) {
			console.error('Erro no update:', error)
			throw error
		}
	}

}

export { UserUseCase };

