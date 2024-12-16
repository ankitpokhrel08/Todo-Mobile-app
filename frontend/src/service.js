import Axios from "axios";

console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchTasks = async () => {
  try {
    if (!navigator.onLine) {
      const offlineTasks = JSON.parse(localStorage.getItem('offlineTasks') || '[]');
      return offlineTasks;
    }
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    console.log("Error service/fetchTasks: ", error);
    throw error;
  }
};

export const createTask = async (payload) => {
  try {
    const response = await axios.post("/task/create", payload);
    return response.data;
  } catch (error) {
    console.log("Error service/createTask: ", error);
    throw error;
  }
};

export const editTask = async (id, completed) => {
  try {
    const response = await axios.patch("/task/edit/" + id, {
      completed,
    });
    return response.data;
  } catch (error) {
    console.log("Error service/editTask: ", error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axios.patch(`/task/update-status/${id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.log("Error service/updateTaskStatus: ", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`/task/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error service/deleteTask: ", error);
    throw error;
  }
};
