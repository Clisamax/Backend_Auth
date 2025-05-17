import { FastifyInstance } from "fastify";
import { UserUpdate } from "../../modules/users/dtos/user.dto";
import { UserUserCase } from "../../modules/users/useCases/user.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";

export async function updateUser(app: FastifyInstance) {
	app.put<{ Params: { id: string }, Body: UserUpdate }>('/update_user/:id', {
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const { id } = req.params;
			const updateData = req.body;

			// Validações básicas
			if (!id) {
				return reply.status(400).send({ message: 'ID é obrigatório' });
			}

			if (Object.keys(updateData as object).length === 0) {
				return reply.status(400).send({ message: 'Nenhum dado para atualizar' });
			}

			const userUseCase = new UserUserCase();
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