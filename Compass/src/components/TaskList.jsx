import { useState } from "react";
import { deleteTask, toggleTaskCompletion } from "../services/taskServices";

const groups = [
  { key: "anytime", label: "Any Time", emoji: "🕐", bg: "bg-gray-50", range: null },
  { key: "morning", label: "Morning",  emoji: "🌅", bg: "bg-yellow-50", range: [0, 12] },
  { key: "afternoon", label: "Afternoon", emoji: "☀️", bg: "bg-orange-50", range: [12, 17] },
  { key: "evening", label: "Evening",  emoji: "🌙", bg: "bg-indigo-50", range: [17, 24] },
];

function getGroup(task) {
  if (!task.time) return "anytime";
  const hour = parseInt(task.time.split(":")[0], 10);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
 
}


export default function TaskList({ tasks, onEdit, onDelete, onToggleCompletion }) {
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [togglingTaskId, setTogglingTaskId] = useState(null);

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

  async function handleToggleCompletion(taskId, currentStatus) {
    setTogglingTaskId(taskId);
    try {
      const newStatus = await toggleTaskCompletion(taskId, currentStatus);
      if (onToggleCompletion) {
        onToggleCompletion(taskId, newStatus); // Notify parent to update UI
      }
    } catch (error) {
      console.error("Error toggling task completion: ", error);
      alert("Failed to toggle task completion. Please try again.");
    } finally {
      setTogglingTaskId(null);
    }
  }

  


  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No tasks yet. Click "Add Task" to get started!</p>
      </div>
    );
  }

  const groupedTasks = tasks.reduce((groupsObj, task) => {
    const groupKey = getGroup(task);
    if (!groupsObj[groupKey]) {
      groupsObj[groupKey] = [];
    }
    groupsObj[groupKey].push(task);
    return groupsObj;
  }, {});

    

  return (
    <div className="space-y-3">
      {groups.map(({ key, label, emoji, bg }) => {
        const groupTasks = groupedTasks[key] || [];
        return (
          <div key={key} className={`p-4 rounded-lg ${bg}`}>
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              {emoji} {label}
            </h3>
            <div className="mt-2 space-y-2">
              {groupTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  {/* Add button for completion O - i've done it but the circle does not line up with the task list properly*/}

          <div className="flex gap-3 items-start">
            <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              
              handleToggleCompletion(task.id, task.status);
            }}
            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors hover:bg-green-200 ${
              task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-green-400'
            }`}
            />
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-primary">{task.title}</h4>
                <p className="text-sm text-secondary mt-1">{task.description}</p>

                <div className="flex items-center gap-4 mt-2">
                  {task.deadline && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {task.deadline.toDate ? task.deadline.toDate().toLocaleDateString() : new Date(task.deadline).toLocaleDateString()}
                      {task.time ? ` ${task.time}` : ''}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                task.priority === 'low' ? 'bg-green-100 text-green-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                task.priority === 'high' ? 'bg-red-100 text-red-800' :  
                'bg-purple-100 text-purple-800'
                }`}>
                {task.priority}
                </span>
                <span className="text-xs text-muted bg-gray-100 px-2 py-1 rounded">{task.estimatedDuration} mins</span>
                </div>



                
            </div>
             
            
            <div className="flex gap-1 flex-shrink-0">
              
           
            <button onClick={() => onEdit(task)} className="text-sm text-blue-500 hover:underline font-semibold">Edit</button>
            <button onClick={() => handleDelete(task.id)} className="text-sm text-red-500 hover:underline px-2 py-1 font-semibold">Delete</button>
            </div>
            </div>
            </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}