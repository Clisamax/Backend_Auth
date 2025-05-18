import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { config } from 'dotenv';
import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import { Routes } from './routes/routes';


config();

export const app: FastifyInstance = fastify({ logger: true });

const PORT = process.env.PORT;

// habilitar qual front pode acessar
app.register(fastifyCors, {
	origin: true, // permite todas as origens
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	credentials: true
})

// Registrar JWT antes das rotas
app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || 'default_secret'
})

// Registrar todas as rotas sem prefix
app.register(Routes)

app.listen({
	port: typeof PORT === 'string' ? Number(PORT) : 3333
})
	.then((address) => console.log(`server is listening on port ${address}`))
	.catch(err => {
		console.log('Error starting server:', err)
		process.exit(1)
	})

