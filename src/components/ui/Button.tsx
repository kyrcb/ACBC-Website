import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-navy-900 hover:bg-gold-700 focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
  outline:
    "border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white focus:ring-2 focus:ring-navy-700 focus:ring-offset-2",
  ghost:
    "text-navy-700 hover:underline focus:ring-2 focus:ring-navy-700 focus:ring-offset-2",
};

const base =
  "inline-block font-sans text-sm uppercase tracking-widest px-6 py-3 transition-colors duration-200 focus:outline-none";

export default function Button({
  children,
  variant = "primary",
  href,
  external,
  onClick,
  type = "button",
  className = "",
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
