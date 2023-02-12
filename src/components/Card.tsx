import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return (
    <div
      className={`flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
