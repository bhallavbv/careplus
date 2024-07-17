import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("New user created successfully::", newUser);
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      console.log("Error 409::", error);
      return documents.users[0];
    }
    console.log("Error while creating user::", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    console.log("User fetched successfully::", user);
    return parseStringify(user);
  } catch (error) {
    console.log("Error while fetching user::", error);
  }
};
