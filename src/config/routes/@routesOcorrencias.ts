import CreateOcorrenciaController from "../../controllers/ocorrencia/createOcorrencia.controller";
import { app } from "../server";

export const routesOcorrencias = async () => {
	app.register(CreateOcorrenciaController)
}