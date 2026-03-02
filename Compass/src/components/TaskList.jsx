import { useState } from "react";
import { deleteTask } from "../services/taskServices";

export default function TaskList({ tasks, onEdit, onDelete }) {
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  async function handleDelete(taskId) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setDeletingTaskId(taskId);
      try {
        await deleteTask(taskId);
        if (onDelete) {
          onDelete(taskId); // Notify parent to refresh task list
        }
      } catch (error) {
        console.error("Error deleting task: ", error);
        alert("Failed to delete task. Please try again.");
      } finally {
        setDeletingTaskId(null);
      }
    }
  }

  


  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No tasks yet. Click "Add Task" to get started!</p>
      </div>
    );
  }

    

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-primary">{task.title}</h4>
                <p className="text-sm text-secondary mt-1">{task.description}</p>

                <div className="flex items-center gap-4 mt-2">
                  {task.deadline && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {task.deadline.toDate ? task.deadline.toDate().toLocaleDateString() : new Date(task.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>



                
            </div>
             
            
            <div className="flex flex-col items-end gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                task.priority === 'low' ? 'bg-green-100 text-green-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                task.priority === 'high' ? 'bg-red-100 text-red-800' :  
                'bg-purple-100 text-purple-800'
                }`}>
                {task.priority}
                </span>
                <span className="text-xs text-muted">{task.estimatedDuration} mins</span>
            </div>
            </div>
            <button onClick={() => onEdit(task)} className="text-sm text-blue-500 hover:underline font-semibold">Edit</button>
            <button onClick={() => handleDelete(task.id)} className="text-sm text-red-500 hover:underline px-2 py-1 font-semibold">Delete</button>
        </div>
      ))}
    </div>
  );
}