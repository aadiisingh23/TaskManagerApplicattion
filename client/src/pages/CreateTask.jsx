import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TaskForm from "../components/TaskForm";
import api from "../services/api";

function CreateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      setIsLoading(true);
      await api.post("/tasks", formData);
      toast.success("Task created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">New task</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">Create task</h1>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <TaskForm onSubmit={handleCreate} isLoading={isLoading} submitLabel="Create task" />
      </div>

      <button onClick={() => navigate(-1)} className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-950">
        Back
      </button>
    </div>
  );
}

export default CreateTask;
