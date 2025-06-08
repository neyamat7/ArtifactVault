export default function Progress({ value = 0, className = "", ...props }) {
  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
