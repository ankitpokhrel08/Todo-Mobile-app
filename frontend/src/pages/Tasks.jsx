import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import TaskItem from "../components/TaskItem.jsx";
import { fetchTasks, deleteTask } from "../service.js";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todo'); // Add filter state

  const getTasks = async () => {
    const serverTasks = await fetchTasks();
    const offlineTasks = JSON.parse(localStorage.getItem('offlineTasks') || '[]');
    setTasks([...serverTasks, ...offlineTasks]);
  };

  const handleTaskCheck = (taskId, completed) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
    if (navigator.onLine) {
      getTasks();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      if (!navigator.onLine) {
        setTasks(tasks.filter(task => task.id !== id));
        return toast.success("You're offline! Changes will be synced when you're online again.");
      }
      toast.error("Error deleting task");
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  useEffect(() => {
    getTasks();

    // Handle online status
    const handleOnline = async () => {
      const offlineTasks = JSON.parse(localStorage.getItem('offlineTasks') || '[]');
      if (offlineTasks.length > 0) {
        toast.loading('Syncing offline tasks...');
        
        for (const task of offlineTasks) {
          try {
            await createTask({
              body: task.body,
              priority: task.priority
            });
          } catch (error) {
            console.error('Error syncing task:', error);
          }
        }
        
        localStorage.setItem('offlineTasks', '[]');
        toast.success('All tasks synced!');
        getTasks();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (task.isOffline) return filter === 'todo';
    return task.status === filter;
  });

  return (
    <Layout>
      {/* tags header */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setFilter('todo')}
          className={`p-2 px-3 flex rounded-full ${filter === 'todo' ? 'bg-green-200 text-black' : 'bg-gray-800 text-white'}`}
        >
          Todo
        </button>
        <button 
          onClick={() => setFilter('in-progress')}
          className={`p-2 px-3 flex rounded-full ${filter === 'in-progress' ? 'bg-yellow-200 text-black' : 'bg-gray-800 text-white'}`}
        >
          In Progress
        </button>
        <button 
          onClick={() => setFilter('done')}
          className={`p-2 px-3 flex rounded-full ${filter === 'done' ? 'bg-green-200 text-black' : 'bg-gray-800 text-white'}`}
        >
          Done
        </button>

        <Link
          to="/create"
          className="bg-yellow-200 flex rounded-full h-fit my-auto p-2 
        text-black ml-auto"
        >
          <IoAdd className="text-xl" />
        </Link>
      </div>

      {/* tasks */}
      <div className="space-y-2">
        {filteredTasks.map((task, index) => (
          <TaskItem
            id={task.id}
            key={index + "task"}
            body={task.body}
            status={task.status}
            priority={task.priority}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;
