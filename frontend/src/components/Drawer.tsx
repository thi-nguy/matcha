import { ReactNode } from "react";

interface DrawerProp {
  children: ReactNode;
}
export const Drawer = ({ children }: DrawerProp) => {
  const baseStyle =
    "bg-white w-80 absolute -right-80 top-40 shadow-lg rounded-3xl";

  return <div className={baseStyle}>{children}</div>;
};
