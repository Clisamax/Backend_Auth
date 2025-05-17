import { createUser } from "../../controllers/users/createUser.controller";
import { deleteUser } from "../../controllers/users/deleteUser.controller";
import { loginUser } from "../../controllers/users/loginUser.controller";
import { updateUser } from "../../controllers/users/updateUser.controller";
import { app } from "../server";


export const routesUsers = async () => {
	app.register(createUser)
	app.register(deleteUser)
	app.register(loginUser)
	app.register(updateUser)
}