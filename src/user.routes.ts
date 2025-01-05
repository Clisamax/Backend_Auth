import { FastifyInstance } from "fastify";
import { UserCreate } from "./interfaces/userInterface.ts";
import { UserUserCase } from "./useCases/user.usecase.ts";


async function userRoutes(app: FastifyInstance) {
	// implementar rotas de usuario aqui
	// aqui fica a logica para lidar com as rotas
	// por exemplo, uma rota para cadastrar um novo usuario
	app.post<{ Body: UserCreate }>('/', async (req, reply) => {
		// aqui fica a chamada para o userUseCase.create
		const userUseCase = new UserUserCase();
		const { name, sap, password } = req.body
		try {
			const user = await userUseCase.create({
				name, sap, password
			});
			return reply.status(201).send(user);
		} catch (error) {
			reply.status(400).send(error);
		}
	});
	app.get('/', async (req, reply) => {
		reply.send({hello: 'Hello world'})

	})
}

export { userRoutes };