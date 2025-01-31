import { FastifyInstance } from "fastify";
import { login } from "../interfaces/userInterface.ts";
import { UserUseCase } from "../useCases/user.usecase.ts";

export async function loginUser(app: FastifyInstance) {
	app.post<{ Body: login }>('/login', async (req, reply) => {
		try {
			const userUseCase = new UserUseCase();
			const { sap, password } = req.body;

			if (!sap || !password) {
				return reply.status(400).send({
					message: 'SAP e senha são obrigatórios'
				});
			}

			const user = await userUseCase.login(sap, password);

			if (!user) {
				return reply.status(401).send({
					message: 'Credenciais inválidas'
				});
			}

			const token = app.jwt.sign(
				{
					sap: user.sap,
					name: user.name,
					userId: user.id
				},
				{
					expiresIn: '8h'
				}
			);

			return reply.status(200).send({
				token,
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			});
		} catch (error) {
			console.error('Erro no login:', error);
			return reply.status(500).send({
				message: 'Erro interno do servidor'
			});
		}
	});
}