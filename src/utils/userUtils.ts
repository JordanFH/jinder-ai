import {
  createDocument,
  fetchDocumentByCondition,
  updateDocumentByCondition,
} from "@/firebase/utils";

export const createUser = async (newUser: any) => {
  await createDocument("users", newUser);
};

export const getUserByEmail = async (email: string) => {
  const user = await fetchDocumentByCondition("users", "email", email);
  return user;
};

export const updateUserByEmail = async (email: string, values: any) => {
  await updateDocumentByCondition("users", "email", email, values);
};
