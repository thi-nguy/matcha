import { ReactNode } from "react";

interface DrawerProp {
    open: boolean;
    anchor?: "left" | "right" | "top" | "bottom";
    onClose: () => void;
    children: ReactNode;
}
export const Drawer = ({ open, anchor = "left", children }: DrawerProp) => {
    const baseStyle = "";
    const positionStyle = {
        left: open ? "translate-x-0" : "translate-x-full",
        right: "",
        top: "",
        bottom: ""
    }
    const classes = [baseStyle, positionStyle[anchor]].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {children}
        </div>
    )


}