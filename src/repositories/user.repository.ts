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
	async findBySeach(sap: string): Promise<User | null> {
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
		try {
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
		} catch (error) {
			return null
		}
	}
}

export { UserRepositoryPrisma };

