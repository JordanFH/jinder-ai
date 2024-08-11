import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  DocumentData,
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";

// Function to create a new document in a collection
export const createDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<void> => {
  await addDoc(collection(db, collectionName), data);
  // console.log("Document created");
};

// Function to fetch all documents from a collection
export const fetchAllDocuments = async (
  collectionName: string
): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(),
  }));
};

// Function to fetch a document by ID
export const fetchDocumentById = async (
  collectionName: string,
  docId: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  } else {
    return null;
  }
};

// Function to fetch a single document by a condition
export const fetchDocumentByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any
): Promise<DocumentData | null> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } else {
    return null;
  }
};

// Function to fetch documents by a condition
export const fetchDocumentsByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any
): Promise<DocumentData[]> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Function to update a document by ID
export const updateDocumentById = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
  // console.log("Document updated:", docId);
};

// Function to update a single document by a condition
export const updateDocumentByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any,
  data: Partial<DocumentData>
): Promise<void> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    const docSnapshot = querySnapshot.docs[0];
    const docRef = docSnapshot.ref;
    await updateDoc(docRef, data);
    // console.log("Document updated:", docSnapshot.id);
  } else {
    // console.log("No document found matching the condition");
  }
};

// Function to update documents by a condition
export const updateDocumentsByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any,
  data: Partial<DocumentData>
): Promise<void> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);
  
  const batch = writeBatch(db);
  querySnapshot.docs.forEach((docSnapshot) => {
    const docRef = docSnapshot.ref;
    batch.update(docRef, data);
  });

  await batch.commit();
  // console.log('Documents updated based on condition');
};

// Function to delete a document by ID
export const deleteDocumentById = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
  // console.log("Document deleted:", docId);
};

// Function to delete a single document by a condition
export const deleteDocumentByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any
): Promise<void> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    const docSnapshot = querySnapshot.docs[0];
    const docRef = docSnapshot.ref;
    await deleteDoc(docRef);
    // console.log("Document deleted:", docSnapshot.id);
  } else {
    // console.log("No document found matching the condition");
  }
};

// Function to delete documents by a condition
export const deleteDocumentsByCondition = async (
  collectionName: string,
  fieldName: string,
  value: any
): Promise<void> => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);
  
  const batch = writeBatch(db);
  querySnapshot.docs.forEach((docSnapshot) => {
    const docRef = docSnapshot.ref;
    batch.delete(docRef);
  });

  await batch.commit();
  // console.log('Documents deleted based on condition');
};
