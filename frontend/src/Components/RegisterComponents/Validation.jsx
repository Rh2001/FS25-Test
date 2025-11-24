export const validateRegister = (f) => {
  const err = {};
  if (!f.name.trim()) err.name = "Name required";
  if (!f.email.trim()) err.email = "Email required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) err.email = "Invalid email";
  if (!f.password) err.password = "Password required";
  else if (f.password.length < 6) err.password = "Min 6 chars";
  if (!f.confirmPassword) err.confirmPassword = "Confirm required";
  else if (f.confirmPassword !== f.password) err.confirmPassword = "No match";
  if (!f.phone.trim()) err.phone = "Phone required";
  if (!f.address.trim()) err.address = "Address required";
  if (f.age && (Number(f.age) < 0 || Number(f.age) > 120)) err.age = "Invalid age";
  return err;
};