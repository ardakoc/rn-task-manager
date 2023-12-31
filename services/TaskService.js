import { db } from './firebase';

const tasksCollection = db.collection('tasks');

export const getTasks = async ({ category, sortBy } = {}) => {
    let query = tasksCollection
    if (category) {
        query = query.where('category', '==', category)
    }
    if (sortBy === 'oldToNew') {
        query = query.orderBy('created_on', 'asc')
    }
    else {
        query = query.orderBy('created_on', 'desc')
    }
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getTask = async (taskId) => {
    const doc = await tasksCollection.doc(taskId).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    else {
        console.log('No such document!');
        return null;
    }
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