import React from "react";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ease-out transform active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:shadow-md",
    secondary:
      "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md",
    danger:
      "bg-red-600 border-red-600 text-white hover:bg-red-700 hover:shadow-md",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}