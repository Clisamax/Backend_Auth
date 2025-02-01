import { FastifyInstance } from "fastify";
import { UserCreate } from "../interfaces/userInterface.ts";
import { UserUseCase } from "../useCases/user.usecase.ts";
import { verifyJwt } from "../middlewares/auth.ts";

export async function createUser(app: FastifyInstance) {
	app.post<{ Body: UserCreate }>('/create_user', async (req, reply) => {
		try {
			const { name, sap, password } = req.body;

			// Validações básicas
			if (!name || !sap || !password) {
				return reply.status(400).send({
					message: 'Nome, SAP e senha são obrigatórios'
				});
			}

			const userUseCase = new UserUseCase();
			const user = await userUseCase.create({ name, sap, password });

			return reply.status(201).send({
				message: 'Usuário criado com sucesso',
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			});

		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'Este usuário já existe') {
					return reply.status(409).send({
						message: error.message
					});
				}
				return reply.status(400).send({
					message: error.message
				});
			}
			return reply.status(500).send({
				message: 'Erro interno do servidor'
			});
		}
	});
}




