import { cors } from 'cors';
import { cors } from 'cors';
import fastifyJwt from '@fastify/jwt';
import { config } from 'dotenv';
import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import { routes } from './user.routes.ts';


config();

export const app: FastifyInstance = fastify({ logger: true });

const PORT = process.env.PORT;
const HOST = process.env.HOST

// habilitar qual front pode acessar
app.register(cors, {
  origin: true, // permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
})

// Registrar JWT antes das rotas
app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || 'default_secret'
})

// Registrar todas as rotas sem prefix
app.register(routes)

app.listen({
	host: typeof HOST === 'string' ? HOST : '0.0.0.0',
	port: typeof PORT === 'string' ? Number(PORT) : 3333
})
	.then((address) => console.log(`server is listening on port ${address}`))
	.catch(err => {
		console.log('Error starting server:', err)
		process.exit(1)
	})