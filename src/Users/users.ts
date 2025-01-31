import { FastifyInstance } from "fastify";
import { UserCreate } from "../interfaces/userInterface.ts";
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
	app.patch<{ Body: { sap: string, name: string, password: string } }>('/update_user', async (req, reply) => {
		const userUseCase = new UserUseCase();
		const { name, sap, password } = req.body
		const user = await userUseCase.update(sap, { name, sap, password })
		return reply.status(200).send(user);
	})
}

export async function deleteUser(app: FastifyInstance) {
	app.delete<{ Body: { id: string, sap: string } }>('/delete_user', async (req, reply) => {
		const userUseCase = new UserUseCase();
		const { id } = req.body
		const user = await userUseCase.delete(id)
		return reply.status(200).send(user);
	})
}
	