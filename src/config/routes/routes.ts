import { app } from "../server"
import { routesOcorrencias } from "./@routesOcorrencias"
import { routesUsers } from "./@routes_users"

export const Routes = async () => {
	app.register(routesUsers)
	app.register(routesOcorrencias)
}