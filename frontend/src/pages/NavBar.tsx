import { IoChatbubbleOutline } from "react-icons/io5";
import { IoAlbumsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from '../assets/match-dark.svg'
import smallLogo from '../assets/logo_match.svg'
import { ProfileDrawer } from "../components/ProfileDrawer";
import { Drawer } from "../components/Drawer";
import { useState } from "react";

const PageList = [
    {
        url: "/discover",
        name: "Discover",
        icon: <IoAlbumsOutline />,
    },
    {
        url: "/chat",
        name: "Chat",
        icon: <IoChatbubbleOutline />
    },
    {
        url: "/profile",
        name: "test test test test test",
        icon: <MdOutlineAccountCircle />,
    },
];
export const NavBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const NavLinkBaseStyle = "flex flex-col sm:flex-row gap-2 p-2 text-center items-center hover:bg-[rgb(219,166,186)] rounded-lg";

    return (
        <div className="relative">
            <div className="flex flex-col items-center p-4">
                <img src={logo} alt="Logo" className="h-16 w-26 hidden sm:block" />
                <img src={smallLogo} alt="Small Logo" className="h-16 w-26 sm:hidden" />

                <div className="flex flex-col gap-2 p-2">
                    {PageList.map((onePage, i) => {
                        return (
                            <NavLink to={onePage.url} key={i} className={({ isActive }) => `${NavLinkBaseStyle} ${isActive ? 'bg-[rgb(243,205,219)] text-pink-700' : 'bg-white'}`} >
                                {onePage.icon}
                                <span className="whitespace-nowrap">{onePage.name}</span>
                            </NavLink>
                        )
                    })}
                    <button onClick={toggleDrawer} className={NavLinkBaseStyle}>
                        <MdOutlineAccountCircle />
                        <span className="whitespace-nowrap">My profiles</span>
                    </button>
                </div>
            </div>
            {isDrawerOpen && <Drawer><ProfileDrawer /></Drawer>}
        </div>
    );
};
