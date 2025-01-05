import { config } from 'dotenv';
import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import { userRoutes } from './user.routes.ts';

config();

const app: FastifyInstance = fastify({ logger: true });

const PORT = process.env.PORT;
const HOST = process.env.HOST

app.register(userRoutes, {
	prefix: '/user'
})

app.listen({
	host: typeof HOST === 'string' ? HOST : '127.0.0.1'
	, port: typeof PORT === 'string' ? Number(PORT) : 3333
})
	.then((address) => console.log(`server is listening on port ${address}`))
	.catch(err => {
		console.log('Error starting server:', err)
		process.exit(1)
	})