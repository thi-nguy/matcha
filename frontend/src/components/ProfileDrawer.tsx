import smallLogo from '../assets/logo_match.svg'
import { Button } from './Button'
import { FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

export const ProfileDrawer = () => {
    const view = 4242424242;
    const myLikes = [{ photoSrc: "", profileLink: "/profiles" }, { photoSrc: "", profileLink: "/profiles" }, { photoSrc: "", profileLink: "/profiles" }]
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
            <div className='grid grid-cols-[20%_auto_10%] place-items-center border-b pb-4'>
                <div>
                    {myLikes.map((oneLike, i) => {
                        return (
                            <a href={oneLike.profileLink} className={`absolute z-${i * 10} left-${i + 5}px`}><img src={oneLike.photoSrc} /></a>
                        )
                    })}
                </div>
                <div>My likes</div>
                <MdKeyboardArrowRight />
            </div>
            <div className='grid grid-cols-[20%_auto_10%] place-items-center border-b pb-4'>
                <PiSignOutBold />
                <div>Sign out</div>
            </div>

        </div>
    )
}