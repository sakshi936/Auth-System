import { account } from "./appwrite";
import { ID } from "./appwrite";

export const SignIn = async (email: string, password: string) => {
	const login = await account.createEmailPasswordSession(email, password);
	return login;
};

export const Register = async (email: string, password: string, name: string | undefined) => {
	const register = await account.create(ID.unique(), email, password, name);
	return register;
};
