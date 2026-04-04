interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return <div className={`w-12 border-t-2 border-gold-500 ${className}`} />;
}
