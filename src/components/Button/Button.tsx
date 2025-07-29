import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function Button({
  variant,
  children,
  disabled,
  onClick,
  className = "",
}: ButtonProps) {
  // Base button styles
  const baseClasses =
    "flex justify-center items-center gap-2 px-4 py-2 font-medium rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant-specific styles
  const variantClasses = {
    primary: "bg-indigo-700 text-white hover:bg-indigo-800",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
