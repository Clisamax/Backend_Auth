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
export interface login{
	sap: string,
  password: string,   // hash da senha
}

// interface com os metodos http
// interface recebendo os dados de UserCreate e retornando os dados junto com User
export interface UserRepository {
	createUser(data: UserCreate): Promise<User>;
	findBySap(sap: string): Promise<User | null>;
	loginUser(data: login ): Promise<User| null>;
	deleteUser(id: string): Promise<User | null>;
}