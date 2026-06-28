import { Link } from "react-router-dom";

function getPriorityColor(priority) {
  if (priority === "high") return "bg-rose-50 text-rose-700 ring-rose-200";
  if (priority === "medium") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

function getStatusColor(status) {
  if (status === "completed") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "in-progress") return "bg-sky-50 text-sky-700 ring-sky-200";
  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function formatLabel(value) {
  return value === "in-progress" ? "In progress" : value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function TaskCard({ task, onDelete }) {
  return (
    <article className="flex min-h-[220px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-semibold leading-6 text-slate-950">{task.title}</h3>
        <span className={"shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 " + getPriorityColor(task.priority)}>
          {formatLabel(task.priority)}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 min-h-[60px] text-sm leading-6 text-slate-500">
        {task.description || "No description added."}
      </p>

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={"rounded-full px-2.5 py-1 text-xs font-semibold ring-1 " + getStatusColor(task.status)}>
            {formatLabel(task.status)}
          </span>
          {task.dueDate && <span className="text-xs font-medium text-slate-500">Due {formatDate(task.dueDate)}</span>}
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <Link to={"/edit/" + task._id} className="rounded-md border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-100">
            Edit
          </Link>
          <button type="button" onClick={() => onDelete(task._id)} className="rounded-md border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
