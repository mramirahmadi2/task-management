import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const addTask = async (task: any) => {
  const docRef = await addDoc(collection(db, "tasks"), task);
  return { id: docRef.id, ...task };
};

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (taskId: string, task: any) => {
  await updateDoc(doc(db, "tasks", taskId), task);
  return { id: taskId, ...task };
};

export const deleteTask = async (taskId: string) => {
  await deleteDoc(doc(db, "tasks", taskId));
};

export const addGoal = async (goal: any) => {
  const docRef = await addDoc(collection(db, "goals"), goal);
  return { id: docRef.id, ...goal };
};

export const getGoals = async () => {
  const querySnapshot = await getDocs(collection(db, "goals"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateGoal = async (goalId: string, goal: any) => {
  await updateDoc(doc(db, "goals", goalId), goal);
  return { id: goalId, ...goal };
};

export const deleteGoal = async (goalId: string) => {
  await deleteDoc(doc(db, "goals", goalId));
}; 