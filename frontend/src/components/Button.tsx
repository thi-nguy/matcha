import { ReactNode } from "react";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
  variant?: "contained";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  children,
  className,
  ...props
}: ButtonProp) => {
  const baseStyle =
    "font-medium rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyle = {
    contained: {
      primary:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      secondary: "bg-gray-200 hover:bg-gray-300 focus:ring-gray-300",
    },
    // outlined: {
    //   primary: "",
    //   secondary: "",
    // },
    // text: {
    //   primary: "",
    //   secondary: "",
    // },
  };

  const sizeStyle = {
    small: "",
    medium: "px-4 py-2 text-base",
    large: "",
  };

  const classes = [
    baseStyle,
    variantStyle[variant][color],
    sizeStyle[size],
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
