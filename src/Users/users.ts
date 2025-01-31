import { FastifyInstance } from "fastify";
import { UserCreate, UserUpdate } from "../interfaces/userInterface.ts";
import { verifyJwt } from '../middlewares/auth.ts';
import { UserUseCase } from "../useCases/user.usecase.ts";


export async function createUser(app: FastifyInstance) {
	// aqui fica a logica para lidar com as rotas
	app.post<{ Body: UserCreate }>('/create_user', async (req, reply) => {
		// aqui fica a chamada para o userUseCase.create
		const userUseCase = new UserUseCase();
		const { name, sap, password } = req.body
		try {
			const user = await userUseCase.create({
				name, sap, password
			});
			return reply.status(201).send(user);
		} catch (error) {
			reply.status(400).send(error);
		}
	})
}

export async function updateUser(app: FastifyInstance) {
	app.put<{ Params: { id: string }, Body: UserUpdate }>('/users/:id', {
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const { id } = req.params;
			const updateData = req.body;

			// Validações básicas
			if (!id) {
				return reply.status(400).send({ message: 'ID é obrigatório' });
			}

			if (Object.keys(updateData).length === 0) {
				return reply.status(400).send({ message: 'Nenhum dado para atualizar' });
			}

			const userUseCase = new UserUseCase();
			const updatedUser = await userUseCase.update(id, updateData);

			return reply.status(200).send({
				message: 'Usuário atualizado com sucesso',
				user: updatedUser ? {
					id: updatedUser.id,
					name: updatedUser.name,
					sap: updatedUser.sap
				} : null
			});
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(400).send({ message: error.message });
			}
			return reply.status(500).send({ message: 'Erro interno do servidor' });
		}
	});
}

export async function deleteUser(app: FastifyInstance) {
	app.delete<{ Body: { id: string, sap: string } }>('/delete_user', async (req, reply) => {
		const userUseCase = new UserUseCase();
		const { id } = req.body
		const user = await userUseCase.delete(id)
		try {
			return reply.status(200).send(user);
		} catch (error) {
			reply.status(400).send(error);
		}
	})
}
