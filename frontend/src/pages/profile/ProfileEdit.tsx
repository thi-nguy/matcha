import { IoCameraOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Button } from "../../components/Button";
import avatar1 from "../../assets/avatar1.jpeg";
import avatar2 from "../../assets/avatar2.jpeg";
import wave from "../../assets/layered-waves-haikei.svg";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TbListTree } from "react-icons/tb";

export const ProfileEdit = () => {
  return (
    <div>
      {/* Change photo section */}
      <div
        className="pt-12 pb-12 bg-cover"
        style={{ backgroundImage: `url(${wave})` }}
      >
        <div className="flex justify-end">
          <Button size="small" color="secondary" className="shadow-2xl">
            <FaRegEye />
            <span>View my profile</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 text-3xl font-bold">
          <IoCameraOutline />
          <span>My pictures</span>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 items-center">
          <img
            className="rounded-3xl 
            col-span-2 row-span-2"
            src={avatar1}
            alt="avatar"
          />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
        </div>

        <div className="flex justify-end gap-4 p-4">
          <Button size="small" color="secondary">
            Change my photos
          </Button>
          <Button size="small" color="primary">
            Add a new photo
          </Button>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <div className="flex items-center gap-2 text-3xl font-bold">
          <BiSolidQuoteAltLeft />
          <span>My description</span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          cupiditate quas! Laudantium est ea maiores consectetur dolor magni, a
          quos est repellendus eaque amet, voluptate doloribus sunt consequatur
          soluta molestiae.
        </p>

        <div className="flex items-center gap-2 text-3xl font-bold">
          <TbListTree />
          <span>I am</span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          cupiditate quas! Laudantium est ea maiores consectetur dolor magni, a
          quos est repellendus eaque amet, voluptate doloribus sunt consequatur
          soluta molestiae.
        </p>

        <div className="flex items-center gap-2 text-3xl font-bold">
          <TbListTree />
          <span>I am looking for</span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          magni, a quos est repellendus eaque amet, voluptate doloribus sunt
          cupiditate quas! Laudantium est ea maiores consectetur dolor
          consequatur soluta molestiae.
        </p>
      </div>
    </div>
  );
};
