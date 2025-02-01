import { createUser} from './Users/create.users.ts';
import { updateUser } from './Users/update.users.ts'
import { deleteUser } from './Users/delete.users.ts'
import { loginUser } from './login/login.ts';
import { app } from './server.ts';

export const routes = async () => {
	app.register(createUser)
	app.register(loginUser)
	app.register(updateUser)
	app.register(deleteUser)
}