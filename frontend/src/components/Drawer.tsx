import { ReactNode } from "react";

interface DrawerProp {
    children: ReactNode;
}
export const Drawer = ({ children }: DrawerProp) => {
    const baseStyle = "bg-white w-80 fixed left-40 top-32 shadow-lg rounded-3xl";

    return (
        <div className={baseStyle}>
            {children}
        </div>
    )


}