// Idea is to have a dashboard that shows an overview of tasks, projects, and upcoming deadlines.
// Most settings and navigation will be accessible from here via a sidebar or top navigation bar that moves in as needed.
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { getTasks } from '../services/taskServices';


function getDate(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  


const suffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
  
};
return `${month} ${day}${suffix(day)}, ${year}`;

}

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false); 

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [editTask, setEditTask] = useState(null); // State to hold the task being edited

    const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date, default to today

    // Fetch tasks when the component mounts

    useEffect(() => {
      if (currentUser) {
        loadTasks();
      }
    }, [currentUser, selectedDate]);

    async function loadTasks() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const fetchedTasks = await getTasks(currentUser.uid);

        const filteredTasks = fetchedTasks.filter(task => {
          if (task.status === 'completed') return false; 

          if (task.deadline) {
            const deadlineDate = task.deadline.toDate ? task.deadline.toDate() : new Date(task.deadline);
            return deadlineDate.getDate() === selectedDate.getDate() &&
             deadlineDate.getMonth() === selectedDate.getMonth() &&
             deadlineDate.getFullYear() === selectedDate.getFullYear();
          }
          });

        filteredTasks.sort((a, b) => {
            return a.createdAt.toMillis() - b.createdAt.toMillis();  // Ascending order
        });

        setTasks(filteredTasks);


        

      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
      setLoading(false);
    }

    function previousDay() {
      const previousDate = new Date(selectedDate);
      previousDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(previousDate);
    }

    function nextDay() {
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(nextDate);
    }

    function goToToday() {
      setSelectedDate(new Date());
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
            <span className=" text-secondary">{currentUser ? currentUser.displayName || currentUser.email : "Guest"}</span>
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
          <div> 
                <h2 className="text-4xl font-bold text-primary mb-2">{getDate(selectedDate)}</h2>
               </div>
          
          {/*<h2 className="text-4xl font-bold text-primary mb-2">Today</h2> */}
            <div className="flex items-center justify-center gap-3 mb-2"> 
              
              <button onClick={previousDay} className="px-1 py-1 hover:scale-105 transition-transform duration-100 hover:bg-primary-hover rounded-lg hover:text-green-400 cursor-pointer rounded-lg transition"> ⇦ Previous</button>
              <button onClick={goToToday} className="px-3 py-1 hover:scale-105 transition-transform duration-100 hover:bg-primary-hover rounded-lg hover:text-green-400 cursor-pointer rounded-lg transition">Today</button>
              <button onClick={nextDay} className="px-3 py-1 hover:scale-105 transition-transform duration-100 hover:bg-primary-hover rounded-lg hover:text-green-400 cursor-pointer rounded-lg transition">Next ⇨</button>
              
               </div>
               

          
          {/*<p className="text-secondary">{getDate(selectedDate)}</p> */}
        </div>

        {/* Task Button */}
        <div className="flex justify-center mb-6 hover:scale-105 transition-transform duration-100 hover:bg-primary-hover rounded-lg hover:text-green-400 cursor-pointer">
          <button onClick={() => {
            setEditTask(null);
            setIsFormOpen(true);
          }} className="bg-primary hover:bg-primary-hover text-primary px-6 py-1 rounded-lg font-medium transition">
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
              Loading tasks... </div>) : ( <TaskList tasks={tasks} onEdit={handleEdit} onDelete={loadTasks} onToggleCompletion={loadTasks} /> )}
        </div>


        </main>  

        {/* Task Form - a modal where the main screen should be visible when opened */}
        <TaskForm isOpen={isFormOpen} onClose={handleCloseForm} onTaskCreated={loadTasks} editTask={editTask} />

      </div>

    );
}
    