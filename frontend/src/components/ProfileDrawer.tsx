import smallLogo from '../assets/logo_match.svg'
import { Button } from './Button'

export const ProfileDrawer = () => {
    return (
        <div className='grid'>
            <img src={smallLogo} alt="avatar" className='w-10 h-10 rounded-lg' />
            <div className='grid'>
                <div>Profile Name</div>
                <div>Age, Location</div>
                <Button color="secondary">Edit my profile</Button>
            </div>
        </div>
    )
}