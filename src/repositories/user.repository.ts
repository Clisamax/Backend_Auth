import { User, UserCreate, UserRepository, UserUpdate } from '../../src/interfaces/userInterface.ts';
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
	async findById(id: string): Promise<User | null> {
		const result = await prisma.user.findUnique({
			where: { id }
		})
		return result
	}
	async updateUser(id: string, data: UserUpdate): Promise<User | null> {
		try {
			// Verifica se o usuário existe
			const existingUser = await this.findById(id)
			if (!existingUser) {
				return null
			}

			// Remove campos undefined do objeto de atualização
			const updateData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => value !== undefined)
			)

			const result = await prisma.user.update({
				where: { id },
				data: updateData
			})
			return result
		} catch (error) {
			console.error('Erro ao atualizar usuário:', error)
			return null
		}
	}
}

export { UserRepositoryPrisma };

