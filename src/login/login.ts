import { FastifyInstance, RouteGenericInterface } from "fastify";
import { login } from "../interfaces/userInterface.ts";
import { UserUseCase } from "../useCases/user.usecase.ts";




export async function loginUser(app: FastifyInstance) {
	app.post<{ Body: login }>('/login', async (req, reply) => {
		const userUseCase = new UserUseCase();
		const { sap, password } = req.body
		const user = await userUseCase.login(sap, password)
		if (!user) {
			return reply.status(401).send({ message: 'Invalid credentials' })
		}
		return reply.status(200).send(user)
	})
}