import smallLogo from '../assets/logo_match.svg'
import { Button } from './Button'
import { FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import avatar1 from "../assets/avatar1.jpeg";
import avatar2 from "../assets/avatar2.jpeg";
import avatar3 from "../assets/avatar3.jpeg";

export const ProfileDrawer = () => {
    const view = 4242424242;
    const myLikes = [{ photoSrc: avatar1, profileLink: "/profile" }, { photoSrc: avatar2, profileLink: "/profile" }, { photoSrc: avatar3, profileLink: "/profile" }]
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid  grid-cols-[1fr_2fr] border-b'>
                <img src={smallLogo} alt="avatar" className='rounded-lg' />
                <div>
                    <div>Profile Name</div>
                    <div>Age, Location</div>
                    <Button color="secondary">Edit my profile</Button>
                </div>
            </div>
            <div className='grid grid-cols-[20%_auto_10%] place-items-center border-b pb-4'>
                <FaRegEye />
                <div>Who viewed your profile ({view})</div>
                <MdKeyboardArrowRight />
            </div>
            <div className='grid grid-cols-[auto_10%] place-items-center border-b pb-4'>
                {myLikes.map((oneLike, i) => {
                    return (
                        <a href={oneLike.profileLink} className="absolute hover:scale-125 transition-all duration-400" style={{ left: `${(i + 1) * 20}px`, zIndex: myLikes.length - i }}><img className="w-8 h-8 object-cover rounded-lg border-2 border-white " loading="lazy" src={oneLike.photoSrc} alt={`avatar_${i}`} /></a>
                    )
                })}
                <div>My likes</div>
                <MdKeyboardArrowRight />
            </div>
            <div className='grid grid-cols-[20%_auto_10%] place-items-center pb-4'>
                <PiSignOutBold />
                <div>Sign out</div>
            </div>

        </div >
    )
}