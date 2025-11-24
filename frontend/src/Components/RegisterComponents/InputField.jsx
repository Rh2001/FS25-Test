// InputField for the register component
import React from "react";

export default function InputField({ label, name, type = "text", value, onChange, error, autoComplete }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-gray-400">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        className={`bg-[#0f131a] border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
          error ? "border-red-500 focus:ring-red-500" : "border-[#2b3240] focus:ring-sky-400"
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}