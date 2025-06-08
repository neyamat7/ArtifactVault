 
export default function Badge({
  children,
  variant = "default",
  className = "",
  style = {},
  ...props
}) {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    secondary: "bg-slate-800 text-slate-100",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-slate-200 text-slate-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}
