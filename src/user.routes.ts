
import {app} from './server.ts';
import { createUser } from './Users/create_user.ts';

export const routes = async () => {
	app.register(createUser)
}