"use client";

import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]",
        "bg-accent/10 text-accent border border-accent/20",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
      {children}
    </span>
  );
}
