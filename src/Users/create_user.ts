import { FastifyInstance } from "fastify";
import { UserCreate } from "../interfaces/userInterface.ts";
import { UserUseCase } from "../useCases/user.usecase.ts";


export async function createUser(app: FastifyInstance) {
	// aqui fica a logica para lidar com as rotas
	app.post<{ Body: UserCreate }>('/', async (req, reply) => {
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
			// caso ocorra algum erro, responde com status 400 e o erro em JSON
			// outra forma de lidar com erros é usar um middleware global para tratar todos os erros em uma unica função,
			// por exemplo, usando o fastify-error-handler middleware.
			// app.register(require('fastify-error-handler'));
		}
	})
}
