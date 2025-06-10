 ;

import { useEffect, useRef, useState } from "react";

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {children({ isOpen, setIsOpen })}
    </div>
  );
}

export function DropdownMenuTrigger({ children, onClick, ...props }) {
  return (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuContent({
  children,
  isOpen,
  align = "end",
  className = "",
  ...props
}) {
  if (!isOpen) return null;

  const alignClasses = {
    start: "left-0",
    end: "right-0",
  };

  return (
    <div
      className={`absolute top-full mt-2 ${alignClasses[align]} z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 text-left ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className = "", ...props }) {
  return (
    <div className={`-mx-1 my-1 h-px bg-slate-200 ${className}`} {...props} />
  );
}
