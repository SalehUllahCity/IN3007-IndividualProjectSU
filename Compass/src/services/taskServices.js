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
}

export async function updateTask(taskId, updatedTask) {
}

export async function deleteTask(taskId) {
}

export async function toggleTaskCompletion(taskId, currentStatus) {
}

// Check video saved on Notion to complete this later 'under login task'