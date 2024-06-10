import React from "react";

export default function Button({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="relative border border-slate-500 px-2.5 py-1.5 text-slate-700 disabled:line-through"
      aria-label={children}
    >
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-600 group-hover:w-full group-hover:transition-all"></span>
      <span className="absolute bottom-0 left-0 h-0 w-0.5 bg-slate-600 group-hover:h-full group-hover:transition-all"></span>
      {children}
    </button>
  );
}
