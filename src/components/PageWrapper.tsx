import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <div className="animate-pageFade min-h-screen">
      {children}
    </div>
  );
}