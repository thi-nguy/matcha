import { ReactNode } from "react";

interface TooltipProp {
  children: ReactNode;
  content: string;
  activate?: boolean;
}
export const Tooltip = ({
  children,
  content,
  activate = true,
}: TooltipProp) => {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute hidden ${
          activate && "group-hover:block"
        } bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100 -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap`}
      >
        {content}
      </div>
    </div>
  );
};
