import { User, UserCreate, UserRepository, login } from '../../src/interfaces/userInterface.ts';
import { prisma } from '../../src/prisma/client.ts';

// aqui fica as operações de banco de dados 
class UserRepositoryPrisma implements UserRepository {
	loginUser(data: login): Promise<User| null> {
		const result = prisma.user.findUnique({
			where: {
        sap: data.sap,
        password: data.password // hash da senha
      }
		})
		return result || null

	}
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
	async deleteUser(id: string): Promise<User | null> {

		const result = await prisma.user.delete({
			where: {
				id
			}
		})
		return result

	}
	async updateUser(id: string, data: UserCreate): Promise<User | null> {
		const result = await prisma.user.update({
			where: {
				id
			},
			data: {
				name: data.name,
				sap: data.sap,
				password: data.password
			}
		})
		return result
	}
}

export { UserRepositoryPrisma };

