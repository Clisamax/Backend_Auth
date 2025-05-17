import { FastifyInstance } from "fastify";
import { login } from "../../modules/users/dtos/user.dto";
import { UserUserCase } from "../../modules/users/useCases/user.usecase";


export async function loginUser(app: FastifyInstance) {
	app.post<{ Body: login }>('/login', async (req, reply) => {
		try {
			const userUseCase = new UserUserCase()
			const { sap, password } = req.body;
			//=> verifica se o sap e senhas existem
			if (!sap || !password) {
				return reply.status(400).send({
					message: 'SAP e Senha são obrigatórios'
				});
			}

			const user = await userUseCase.login(sap, password);
			//=> verifica se usuário existe
			if (!user) {
				return reply.status(401).send({
					message: 'Credenciais inválidas'
				});
			}

			const token = app.jwt.sign(
				{
					sap: user.sap,
					name: user.name,
					userId: user.id,
					expiresIn: '1h'
				},

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