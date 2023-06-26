interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      onChange={(e) => e.currentTarget.setCustomValidity("")}
      {...props}
    />
  );
}
