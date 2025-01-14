import { User, UserCreate, UserRepository } from '../../src/interfaces/userInterface.ts';
import { prisma } from '../../src/prisma/client.ts';

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
	async findBySap(sap: string): Promise<User | null> {
		const result = await prisma.user.findUnique({
			where: {
				sap
			}
		})
		return result || null

	}
}

export { UserRepositoryPrisma };

