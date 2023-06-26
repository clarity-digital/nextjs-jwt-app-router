interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      onChange={(e) => e.currentTarget.setCustomValidity("")}
      {...props}
    />
  );
}
