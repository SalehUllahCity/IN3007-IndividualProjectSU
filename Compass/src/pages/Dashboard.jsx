// Idea is to have a dashboard that shows an overview of tasks, projects, and upcoming deadlines.
// Most settings and navigation will be accessible from here via a sidebar or top navigation bar that moves in as needed.
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../contexts/AuthContext';


export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false); 
      
      
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
          <button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover text-primary px-6 py-3 rounded-lg font-medium transition">
            + Add Task
          </button>
        </div>

        {/* Tasks list */}
        <div className="bg-background-surface rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-primary mb-4">My Tasks</h3>
          
          {/*to add tasks*/}
          <div className="text-center py-12 text-muted">
            <p>No tasks. Well done!</p>
          </div>
        </div>


        </main>  

        {/* Task Form - a modal where the main screen should be visible when opened */}
        <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      </div>

    );
}
    