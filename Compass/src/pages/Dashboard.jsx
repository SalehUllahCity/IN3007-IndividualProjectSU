// Idea is to have a dashboard that shows an overview of tasks, projects, and upcoming deadlines.
// Most settings and navigation will be accessible from here via a sidebar or top navigation bar that moves in as needed.
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { getTasks } from '../services/taskServices';



export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false); 

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [editTask, setEditTask] = useState(null); // State to hold the task being edited

    // Fetch tasks when the component mounts

    useEffect(() => {
      if (currentUser) {
        loadTasks();
      }
    }, [currentUser]);

    async function loadTasks() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const fetchedTasks = await getTasks(currentUser.uid);
        setTasks(fetchedTasks);


      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
      setLoading(false);
    }

    function handleEdit(task) {
      setEditTask(task);
      setIsFormOpen(true);
    }

    function handleCloseForm() {
      setEditTask(null);
      setIsFormOpen(false);
    }
      
      
    async function handleLogout() {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Failed to log out:", error);
      }
  }


    return (
        <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-surface border-b border-primary-soft">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          {/*
           <div>
              <img
                src="/logo.png"
                alt="Compass"
                className="w-6 h-6"
              />
            </div>
            */}
          <h1 className="text-2xl font-bold text-primary">Compass</h1>
          <div className="flex items-center gap-4">
            {/* User profile to be done */}
            <button
              onClick={handleLogout}
              className="px-4 py-2  text-black rounded-lg hover:opacity-90 transition hover:underline cursor-pointer hover:text-green-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Date header */}
         <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-2">Today</h2>
          <p className="text-secondary">January 25, 2026</p>
        </div>

        {/* Task Button */}
        <div className="flex justify-center mb-8 hover:scale-105 transition-transform duration-100 hover:bg-primary-hover rounded-lg hover:text-green-400 cursor-pointer">
          <button onClick={() => {
            setEditTask(null);
            setIsFormOpen(true);
          }} className="bg-primary hover:bg-primary-hover text-primary px-6 py-3 rounded-lg font-medium transition">
            + Add Task
          </button>
        </div>

        {/* Tasks list */}
        <div className="bg-background-surface rounded-lg p-6 shadow-sm">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">My Tasks</h3>
            <span className="text-sm text-gray-500">{tasks.length} tasks</span>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading tasks... </div>) : ( <TaskList tasks={tasks} onEdit={handleEdit} onDelete={loadTasks} /> )}
        </div>


        </main>  

        {/* Task Form - a modal where the main screen should be visible when opened */}
        <TaskForm isOpen={isFormOpen} onClose={handleCloseForm} onTaskCreated={loadTasks} editTask={editTask} />

      </div>

    );
}
    