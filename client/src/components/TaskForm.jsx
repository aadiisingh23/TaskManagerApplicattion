import { useEffect } from "react";
import { useForm } from "react-hook-form";

function TaskForm({ onSubmit, defaultValues, isLoading, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 100, message: "Title cannot exceed 100 characters" },
          })}
          type="text"
          placeholder="What needs to be done?"
          className={inputClass + (errors.title ? " border-rose-400" : "")}
        />
        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          {...register("description", {
            maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
          })}
          rows={4}
          placeholder="Add context, notes, or next steps."
          className={inputClass + " resize-none" + (errors.description ? " border-rose-400" : "")}
        />
        {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select {...register("status")} className={inputClass + " bg-white"}>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
          <select {...register("priority")} className={inputClass + " bg-white"}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Due date</label>
          <input {...register("dueDate")} type="date" className={inputClass} />
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
        {isLoading ? "Saving..." : submitLabel || "Save task"}
      </button>
    </form>
  );
}

export default TaskForm;
