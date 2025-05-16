import { IoChatbubbleOutline } from "react-icons/io5";
import { IoAlbumsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
const PageList = [
    {
        url: "/chat",
        name: "chat",
        icon: <IoChatbubbleOutline />
    },
    {
        url: "/discover",
        name: "discover",
        icon: <IoAlbumsOutline />,
    },
    {
        url: "/profile",
        name: "profile",
        icon: <MdOutlineAccountCircle />,
    },
];
export const NavBar = () => {
    return (
        <div className="">
            <div className="flex-col">{PageList.map((onePage, i) => {
                return (
                    <NavLink to={onePage.url} key={i}>
                        {onePage.icon}
                        <span>{onePage.name}</span>
                    </NavLink>
                )
            })}
            </div>
        </div>
    );
};
