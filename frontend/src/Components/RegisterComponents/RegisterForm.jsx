import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { validateRegister } from "./Validation";
import { createUser } from "./APIUtils/API";

function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", age: "", address: ""
  });
  const [errors, setErrors] = useState({}); // Errors to show for each field.
  const [loading, setLoading] = useState(false); // Loading state for backend.

  const update = (e) => { // Update form
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const validation = validateRegister(form); // Validate the registration form
    setErrors(validation);
    if (Object.keys(validation).length) return;  // If there are validation errors, do not do anything.

    // Trim everything to prepare it for use 
    const payload = {
      name: form.name.trim(), 
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      age: form.age ? Number(form.age) : null,
      address: form.address.trim()
    };

    try {
      setLoading(true); // Set the loading state before accessing database
      await createUser(payload);                  // Create a new user in the database
      navigate("/store");
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1b1f29]/90 border border-[#2c3342] rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-6">
        Register
      </h2>
      <form onSubmit={submit} className="space-y-4">
        <InputField label="Full Name" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={update} error={errors.password} autoComplete="new-password" />
        <InputField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} error={errors.confirmPassword} autoComplete="new-password" />
        <InputField label="Phone" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Age" name="age" type="number" value={form.age} onChange={update} error={errors.age} />
          <InputField label="Address" name="address" value={form.address} onChange={update} error={errors.address} autoComplete="street-address" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-semibold rounded-lg px-4 py-2 shadow-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bokhar Store
      </div>
    </div>
  );
}
export default RegisterForm;