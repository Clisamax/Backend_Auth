import { createUser, updateUser, deleteUser } from './Users/users.ts';
import { loginUser } from './login/login.ts';
import { app } from './server.ts';

export const routes = async () => {
	app.register(createUser)
	app.register(loginUser)
	app.register(updateUser)
	app.register(deleteUser)
}