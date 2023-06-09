export default function Input({ ...props }) {
  return (
    <input
      onChange={(e) => e.currentTarget.setCustomValidity("")}
      {...props}
    />
  );
}
