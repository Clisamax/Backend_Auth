import { config } from 'dotenv';
import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import { routes } from './user.routes.ts';
import fastifyJwt from '@fastify/jwt';

config();

export const app: FastifyInstance = fastify({ logger: true });

const PORT = process.env.PORT;
const HOST = process.env.HOST

app.register(routes, {
	prefix: '/user'
})
app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || 'default_secret'
})

app.listen({
	host: typeof HOST === 'string' ? HOST : '0.0.0.0',
	port: typeof PORT === 'string' ? Number(PORT) : 3333
})
	.then((address) => console.log(`server is listening on port ${address}`))
	.catch(err => {
		console.log('Error starting server:', err)
		process.exit(1)
	})