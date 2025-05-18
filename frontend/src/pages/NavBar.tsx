import { IoChatbubbleOutline } from "react-icons/io5";
import { IoAlbumsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from '../assets/match-dark.svg'
import smallLogo from '../assets/logo_match.svg'

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
        name: "My profile",
        icon: <MdOutlineAccountCircle />,
    },
];
export const NavBar = () => {
    return (
        <div className="fixed top-0 left-0 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-12 w-26 hidden sm:block" />
            <img src={smallLogo} alt="Small Logo" className="h-16 w-26 sm:hidden" />

            <div className="flex flex-col gap-2 p-4">{PageList.map((onePage, i) => {
                return (
                    <NavLink to={onePage.url} key={i} className={({ isActive }) => `flex flex-col sm:flex-row gap-2 p-2 items-center hover:bg-[rgb(219,166,186)] rounded-lg ${isActive ? 'bg-[rgb(243,205,219)] text-pink-700' : 'bg-white'}`} >
                        {onePage.icon}
                        <span>{onePage.name}</span>
                    </NavLink>
                )
            })}
            </div>
        </div>
    );
};
