import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const statusOptions = ["all", "todo", "in-progress", "completed"];
const priorityOptions = ["all", "low", "medium", "high"];

function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/tasks");
      setTasks(response.data.data);
    } catch (err) {
      setError("Failed to load tasks. Please check that the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    try {
      await api.delete("/tasks/" + taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const search = searchText.toLowerCase();
        const matchesSearch =
          task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search);
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      }),
    [tasks, searchText, statusFilter, priorityFilter]
  );

  const counts = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.status === "completed").length,
      active: tasks.filter((task) => task.status !== "completed").length,
    }),
    [tasks]
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-48 animate-pulse rounded-lg border border-slate-200 bg-white" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-1 text-sm">{error}</p>
          <button onClick={fetchTasks} className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Welcome back, {user?.name}</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">Your tasks</h1>
          </div>
          <Link to="/create" className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            New Task
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">{counts.total}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Active</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">{counts.active}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">{counts.completed}</p>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm capitalize outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status === "all" ? "All status" : status.replace("-", " ")}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm capitalize outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>{priority === "all" ? "All priority" : priority}</option>
            ))}
          </select>
        </div>
      </section>

      {filteredTasks.length === 0 ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <h2 className="text-lg font-semibold text-slate-950">{tasks.length === 0 ? "No tasks yet" : "No matching tasks"}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {tasks.length === 0 ? "Create your first task to start tracking work." : "Try changing your search or filters."}
          </p>
          {tasks.length === 0 && (
            <Link to="/create" className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Create task
            </Link>
          )}
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Home;
