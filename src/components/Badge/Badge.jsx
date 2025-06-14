export default function Badge({
  children,
  variant = "",
  className = "",
  style = {},
  ...props
}) {
  const variants = {
    secondary: "bg-slate-800 text-slate-100",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-slate-200 text-slate-800",
  };

  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant && variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
