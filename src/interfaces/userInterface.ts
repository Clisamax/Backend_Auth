// interface table user
export interface IUserRequest {
	id: string;
	name: string,
	sap: string,
	password: string,
	createdAt: Date,
  updatedAt: Date,
}
// interface for create user 
export interface UserCreate{
	name: string,
	sap: string,
  password: string,
}
// interface recebendo os dados de UserCreate e retornando os dados junto com IUserCreate
export interface UserRepository {
	createUser(data: UserCreate): Promise<IUserRequest>;
}