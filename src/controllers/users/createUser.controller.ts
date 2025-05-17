import { FastifyInstance } from "fastify"
import { UserCreate } from "../../modules/users/dtos/user.dto"
import { UserUserCase } from "../../modules/users/useCases/user.usecase"

export const createUser = async (app: FastifyInstance) => {
	app.post<{ Body: UserCreate }>('/create_user', async (req, reply) => {
		try {
			const { name, sap, password } = req.body
			if (!name || !sap || !password) {
				return reply.status(400).send({
					message: 'Nome, Sap e Senha são obrigatórios'
				})
			}
			const userUserCase = new UserUserCase()
			const user = await userUserCase.createUser({ name, sap, password })

			return reply.status(201).send({
				message: 'Usuário criado com sucesso',
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			})

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
	})
}
