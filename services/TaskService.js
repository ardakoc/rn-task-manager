import { db } from './firebase';

const tasksCollection = db.collection('tasks');

export const getTasks = async () => {
    const snapshot = await tasksCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addTask = async (task) => {
    const docRef = await tasksCollection.add(task);
    return { id: docRef.id, ...task };
};

export const updateTask = async (taskId, updatedTask) => {
    await tasksCollection.doc(taskId).update(updatedTask);
};

export const deleteTask = async (taskId) => {
    await tasksCollection.doc(taskId).delete();
};

export const completeTask = async (taskId, isCompleted) => {
    await tasksCollection.doc(taskId).update({ completed: isCompleted })
};