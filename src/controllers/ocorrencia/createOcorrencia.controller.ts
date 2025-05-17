import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateOcorrencia } from "../../modules/ocorrencia/dtos/ocorrencia.dto";
import OcorrenciaUseCase from "../../modules/ocorrencia/useCases/ocorrencia.usecase";

const CreateOcorrenciaController = async (app: FastifyInstance) => {
	app.post<{ Body: CreateOcorrencia }>('/create_ocorrencia', async (req: FastifyRequest<{ Body: CreateOcorrencia }>, reply: FastifyReply) => {
		try {
			const ocorrenciaUseCase = new OcorrenciaUseCase();
			const result = await ocorrenciaUseCase.createOcorrencia({ anotacao: req.body.anotacao, origem: req.body.origem, processo: req.body.processo, procedimento: req.body.procedimento, responsavel: req.body.responsavel, ocorrencia: req.body.ocorrencia, uuid: req.body.uuid });
			reply.status(201).send(result);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'Este usuário já existe') {
					return reply.status(409).send({
						message: error.message
					});
				}
				return reply.status(400).send({
					message: error.message
				});
			}
			console.error('Erro ao criar ocorrência:', error);
			reply.status(500).send({ error: 'Erro ao criar ocorrência' });
		}
	});
};

export default CreateOcorrenciaController;