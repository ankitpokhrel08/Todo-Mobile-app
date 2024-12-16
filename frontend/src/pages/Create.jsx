import { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createTask } from "../service.js";

function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    priority: 1,
    body: "",
  });

  const inputClassName =
    "border w-full mb-2 border-solid border-gray-400 bg-transparent p-3 rounded-xl";

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (!form.body || !form.priority) return;
      const newTask = {
        id: Date.now(), // Temporary ID for offline
        body: form.body,
        priority: form.priority,
        status: 'todo',
        completed: false,
        isOffline: true
      };

      if (!navigator.onLine) {
        // Store in localStorage for offline access
        const offlineTasks = JSON.parse(localStorage.getItem('offlineTasks') || '[]');
        localStorage.setItem('offlineTasks', JSON.stringify([...offlineTasks, newTask]));
        toast.success("Task saved offline. Will sync when online!");
      } else {
        await createTask(form);
      }
      
      resetForm();
      navigate('/tasks');
    } catch (err) {
      if (!navigator.onLine) {
        resetForm();
        return toast.success(
          "You're offline. We'll save the changes when you're online!"
        );
      }
      toast.error("Error creating task");
    }
  };

  const resetForm = () => {
    setForm({
      priority: 1,
      body: "",
    });
  };

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <form onSubmit={handleForm} className="space-y-2">
        <div className="flex justify-start mb-20">
          <Link to="/tasks" className="mt-4 w-full mr-auto flex gap-2">
            <IoArrowBack className="my-auto text-xl" /> Back
          </Link>
        </div>

        <div>
          <input
            type="text"
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Add a Task..."
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="number"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className="bg-yellow-100 rounded-full py-3 w-40 text-black mx-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Create;
