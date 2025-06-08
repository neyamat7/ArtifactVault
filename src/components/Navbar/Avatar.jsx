export function Avatar({ children, className = "", ...props }) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className = "", ...props }) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
}

// export function AvatarFallback({
//   children,
//   className = "",
//   style = {},
//   ...props
// }) {
//   return (
//     <div
//       className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 text-sm font-medium ${className}`}
//       style={style}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }
