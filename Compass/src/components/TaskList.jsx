export default function TaskList({ tasks }) {
  
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
            <div>
                <h4 className="text-lg font-semibold text-primary">{task.title}</h4>
                <p className="text-sm text-secondary mt-1">{task.description}</p>
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
        </div>
      ))}
    </div>
  );
}