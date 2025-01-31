// interface table user
export interface User {
	id: string;
	name: string,
	sap: string,
	password: string,
	createdAt: Date,
	updatedAt: Date,
}
// interface for create user 	
export interface UserCreate {
	name: string,
	sap: string,
	password: string,
}
export interface login {
	sap: string,
	password: string,
}

// Interface para atualização de usuário
export interface UserUpdate {
	name?: string,
	sap?: string,
	password?: string,
}

// interface com os metodos http
// interface recebendo os dados de UserCreate e retornando os dados junto com User
export interface UserRepository {
	createUser(data: UserCreate): Promise<User>;
	findBySeach(sap: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	deleteUser(id: string): Promise<User | null>;
	updateUser(id: string, data: UserUpdate): Promise<User | null>;
}