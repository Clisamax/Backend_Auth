import { CreateOcorrencia, Ocorrencia } from '../dtos/ocorrencia.dto';
import { OcorrenciaRepository } from '../repositories/ocorrencia.repository';

class OcorrenciaUseCase {
	private OcorrenciaDto: OcorrenciaRepository;
	constructor() {
		this.OcorrenciaDto = new OcorrenciaRepository();
	}
	async createOcorrencia(data: CreateOcorrencia): Promise<Ocorrencia> {
		try {
			const ocorrencia = await this.OcorrenciaDto.create(data);
			return ocorrencia;
		} catch (error) {
			console.error('Erro ao criar ocorrência:', error);
			throw error;
		}
	}

}
export default OcorrenciaUseCase;