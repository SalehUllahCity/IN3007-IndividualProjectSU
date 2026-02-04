import {collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

const tasksCollection = 'tasks';

export async function createTask(userId, task) {
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