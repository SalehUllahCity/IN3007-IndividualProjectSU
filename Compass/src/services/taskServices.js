import {collection, addDoc, getDocs, query, where, doc, orderBy,
    Timestamp, updateDoc, deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
// import { useAuth } from '../contexts/AuthContext';

const tasksCollection = 'tasks';

export async function createTask(userId, task) {
    try {
        const taskData = { // error was not passing in value
            userId,
            title: task.title,
            description: task.description,
            priority: task.priority,
            estimatedDuration: task.estimatedDuration,
            status: 'To Do',
            createdAt: Timestamp.now(),
        };
        const docRef = await addDoc(collection(db, tasksCollection), taskData);
        console.log("Task created with ID: ", docRef.id);
        return docRef.id; // Return the ID of the newly created taskId

    }catch (error) {
        console.error("Error creating task: ", error);
    }
}

export async function getTasks(userId) {
    try {
        const q = query(collection(db, tasksCollection), where("userId", "==", userId), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return tasks;
    }catch (error) {
        console.error("Error fetching tasks: ", error);
    }
}

export async function updateTask(taskId, updatedTask) {
    try {
        const taskRef = doc(db, tasksCollection, taskId);
        await updateDoc(taskRef, {
            title: updatedTask.title,
            description: updatedTask.description,
            priority: updatedTask.priority,
            estimatedDuration: updatedTask.estimatedDuration,
            status: updatedTask.status,
            createdAt: updatedTask.createdAt || Timestamp.now(),
        });
        console.log("Task updated with ID: ", taskId);
    }catch (error) {
        console.error("Error updating task: ", error);
    }
}

export async function deleteTask(taskId) {
    try {
        await deleteDoc(doc(db, tasksCollection, taskId));
        console.log("Task deleted with ID: ", taskId);
    }catch (error) {
        console.error("Error deleting task: ", error);
    }
}

export async function toggleTaskCompletion(taskId, currentStatus) {
}

// Check video saved on Notion to complete this later 'under login task'