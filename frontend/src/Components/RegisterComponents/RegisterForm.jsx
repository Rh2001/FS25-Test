import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { validateRegister } from "./Validation";
import { createUser } from "./APIUtils/API";

function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",        // ISO date string from
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const validation = validateRegister(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      dob: form.dob || null,
      address: form.address.trim(),
    };

    try {
      setLoading(true);
      await createUser(payload); // will throw on non-OK
      navigate("/store");
    } catch (err) {
      // If backend sent our custom message, show it under email
      const msg = String(err.message || "");
      if (msg.includes("already exists") || msg.includes("already in use")) {
        setErrors((prev) => ({
          ...prev,
          email: msg,
        }));
      } else {
        alert("Registration failed: " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827]/90 border border-[#2c3342] rounded-2xl p-8 shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-extrabold text-center text-white mb-6">
        Register
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={update}
          error={errors.name}
          autoComplete="name"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          error={errors.email}
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={update}
          error={errors.password}
          autoComplete="new-password"
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={update}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={update}
          error={errors.phone}
          autoComplete="tel"
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Calendar DOB */}
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={update}
            error={errors.dob}
          />
          <InputField
            label="Address"
            name="address"
            value={form.address}
            onChange={update}
            error={errors.address}
            autoComplete="street-address"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300"
        >
          Already a bokhari? Login
        </button>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bokhar Store
      </div>
    </div>
  );
}

export default RegisterForm;