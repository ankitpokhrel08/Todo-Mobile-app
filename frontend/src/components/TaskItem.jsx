import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import { editTask, updateTaskStatus } from "../service";

function TaskItem({ id, body, priority, status, onStatusChange, onDelete }) {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      onStatusChange(id, newStatus);
      toast.success("Status updated!");
    } catch (err) {
      if (!navigator.onLine) {
        onStatusChange(id, newStatus);
        return toast.success(
          "You're offline! Changes will be synced when you're online again."
        );
      }
      toast.error("Failed to update status!");
    }
  };

  return (
    <div className="bg-[#1f1f1f] p-5 w-full rounded-xl">
      <p className="text-gray-400 text-xs">Priority: {priority}</p>
      <div className="flex w-full mt-2 justify-between">
        <p className="flex grow text-gray-200 text-xl">{body}</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={`px-3 py-1 rounded-full ${
              status === 'in-progress' ? 'bg-yellow-200 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('done')}
            className={`px-3 py-1 rounded-full ${
              status === 'done' ? 'bg-green-200 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="mt-4 w-fit ml-auto">
        <button onClick={() => onDelete(id)} className="text-red-500">
          <IoTrash />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
