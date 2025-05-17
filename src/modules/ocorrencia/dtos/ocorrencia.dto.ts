export interface Ocorrencia {
	id: string;
	uuid: string
	origem: string
	processo: string
	procedimento: string
	responsavel: string
	ocorrencia: string
	anotacao?: string
	createdAt: Date;
	updatedAt: Date;
}
export interface CreateOcorrencia {
	uuid: string
	origem: string
	processo: string
	procedimento: string
	responsavel: string
	ocorrencia: string
	anotacao: string
}
export interface OcorrenciaDto {
	create(data: CreateOcorrencia): Promise<Ocorrencia>;
}