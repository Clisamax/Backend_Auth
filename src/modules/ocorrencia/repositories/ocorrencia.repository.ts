import { prisma } from "../../../shared/lib/client";
import { CreateOcorrencia, Ocorrencia, OcorrenciaDto } from "../dtos/ocorrencia.dto";

export class OcorrenciaRepository implements OcorrenciaDto {
	async create(data: CreateOcorrencia): Promise<Ocorrencia> {
		const result = await prisma.ocorrencia.create({
			data: {
				uuid: data.uuid,
				origem: data.origem,
				processo: data.processo,
				procedimento: data.procedimento,
				responsavel: data.responsavel,
				ocorrencia: data.ocorrencia,
				anotacao: data.anotacao
			}
		})
		return result
	}
}
