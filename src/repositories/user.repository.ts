import { User, UserCreate } from '../interfaces/userInterface.ts';
import { prisma } from '../prisma/client.ts';
import { UserRepository } from './../interfaces/userInterface.ts';

// aqui fica as operações de banco de dados 
class UserRepositoryPrisma implements UserRepository {
	async createUser(data: UserCreate): Promise<User> {

		const result = await prisma.user.create({
			data: {
				name: data.name,
				sap: data.sap,
				password: data.password
			},
		})
		return result
	}
}

export { UserRepositoryPrisma };
