import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import TaskForm from "../components/TaskForm";
import api from "../services/api";

function EditTask() {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get("/tasks/" + id);
        const fetchedTask = response.data.data;

        if (fetchedTask.dueDate) {
          fetchedTask.dueDate = fetchedTask.dueDate.split("T")[0];
        }

        setTask(fetchedTask);
      } catch (error) {
        toast.error("Failed to load task.");
        navigate("/");
      } finally {
        setIsFetching(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      setIsLoading(true);
      await api.put("/tasks/" + id, formData);
      toast.success("Task updated");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm font-medium text-slate-500">
        Loading task...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">Edit task</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">Update task</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <TaskForm onSubmit={handleUpdate} defaultValues={task} isLoading={isLoading} submitLabel="Update task" />
      </div>

      <button onClick={() => navigate(-1)} className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-950">
        Back
      </button>
    </div>
  );
}

export default EditTask;
