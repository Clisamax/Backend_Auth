import { prisma } from "../../../shared/lib/client";
import { User, UserCreate, UserDto, UserUpdate } from "../dtos/user.dto";

class UsersRepository implements UserDto {
	async create(data: UserCreate): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name: data.name,
				sap: data.sap,
				password: data.password
			}
		})
		return user
	}
	async findBySap(sap: string): Promise<User | null> {
		try {
			const result = await prisma.user.findUnique({ where: { sap } })
			return result
		} catch (error) {
			return null
		}
	}
	async findById(id: string): Promise<User | null> {
		try {
			const result = await prisma.user.findUnique({ where: { id } })
			return result

		} catch (error) {
			return null
		}
	}
	async deleteUser(id: string): Promise<User | null> {
		try {
			const result = await prisma.user.delete({
				where: { id }
			});
			return result;
		} catch {
			return null;
		}
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

export default UsersRepository;