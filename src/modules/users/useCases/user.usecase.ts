import { hashPassword, verifyPassword } from '../../../shared/utils/hash';
import { User, UserCreate, UserDto, UserUpdate } from '../dtos/user.dto';
import UsersRepository from '../repositories/user.repository';

class UserUserCase {
	private UserDto: UserDto;
	constructor() {
		this.UserDto = new UsersRepository();
	}
	async login(sap: string, password: string): Promise<User | null> {
		try {
			const user = await this.UserDto.findBySap(sap)
			if (!user) {
				throw new Error('Usuário não encontrado')
			}
			try {
				const isValidPassword = await verifyPassword(password, user.password)
				if (!isValidPassword) {
					return null
				}
				return user
			} catch (error) {
				throw new Error('Senha ou Usuário inválido(a)')
			}
		} catch (error) {
			console.error('Erro ao encontar usuário:', error)
			throw error
		}
	}
	async createUser({ name, sap, password }: UserCreate): Promise<User> {
		const hashedPassword = await hashPassword(password);
		const verifySap = await this.UserDto.findBySap(sap);
		if (verifySap) {
			throw new Error('Este usuário já existe');
		}
		const user = await this.UserDto.create({ name, sap, password: hashedPassword })
		return user;
	}
	async delete(id: string): Promise<User | null> {
		try {
			// Primeiro verifica se o usuário existe
			const user = await this.UserDto.findById(id)
			if (!user) {
				throw new Error('Usuário não encontrado')
			}

			// Se existir, tenta deletar
			try {
				const deletedUser = await this.UserDto.deleteUser(user.id)
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
			const existingUser = await this.UserDto.findById(id)
			if (!existingUser) {
				throw new Error('Usuário não encontrado')
			}

			// Se estiver atualizando o SAP, verifica se já existe
			if (data.sap && data.sap !== existingUser.sap) {
				const userWithSap = await this.UserDto.findBySap(data.sap)
				if (userWithSap) {
					throw new Error('SAP já está em uso')
				}
			}

			// Hash a senha se ela for fornecida
			if (data.password) {
				data.password = await hashPassword(data.password)
			}

			const updatedUser = await this.UserDto.updateUser(id, data)
			if (!updatedUser) {
				throw new Error('Erro ao atualizar usuário')
			}

			return updatedUser
		} catch (error) {
			console.error('Erro no update:', error)
			throw error
		}
	}

	async findBySap(sap: string) {
		throw new Error('Metodo não implementado');
	}

}
export { UserUserCase };
