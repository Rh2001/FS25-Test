import React from "react";

export const validateRegister = (f) => {
  const err = {};
  if (!f.name.trim()) err.name = "Name required";
  if (!f.email.trim()) err.email = "Email required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) err.email = "Invalid email"; // Hardcoded Regex for email validation
  if (!f.password) err.password = "Password required";
  else if (f.password.length < 6) err.password = "Min 6 chars";
  if (!f.confirmPassword) err.confirmPassword = "Confirm required";
  else if (f.confirmPassword !== f.password) err.confirmPassword = "No match";
  if (!f.phone.trim()) err.phone = "Phone required";
  if (!f.address.trim()) err.address = "Address required";
  if (f.age && (Number(f.age) < 0 || Number(f.age) > 120)) err.age = "Invalid age";
  return err;
};



export default function InputField({ // The input field of the registration form
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}) {
  return ( // Return input form with error handling
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