import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";

// Function to fetch all documents from a collection
export const fetchAllDocuments = async (
  collectionName: string
): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

// Function to fetch documents by a condition
export const fetchDocumentsByCondition = async (
  collectionName: string,
  fieldName: string,
  value: string
): Promise<DocumentData[]> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};
