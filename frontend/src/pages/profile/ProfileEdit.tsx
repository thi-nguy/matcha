import { IoCameraOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Button } from "../../components/Button";
import avatar1 from "../../assets/avatar1.jpeg";
import avatar2 from "../../assets/avatar2.jpeg";
import wave from "../../assets/layered-waves-haikei.svg";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TbListTree } from "react-icons/tb";
import { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa6";

export const ProfileEdit = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [photoUrl, setPhotoUrl] = useState<string[]>(Array(4).fill(null));

  const handleSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const photoSelected = event.target.files?.[0];
    if (photoSelected) {
      const url = URL.createObjectURL(photoSelected);
    }

  }
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

        <div className="h-[33.33vh] grid grid-cols-4 grid-rows-2 gap-4 items-stretch">
          <div className="col-span-2 row-span-2 flex justify-center items-center rounded-3xl bg-gray-200"><FaPlus /></div>
          <div className="flex justify-center items-center bg-gray-200 rounded-3xl"><FaPlus /></div>
          <div className="flex justify-center items-center bg-gray-200 rounded-3xl"><FaPlus /></div>
          <div className="flex justify-center items-center bg-gray-200 rounded-3xl"><FaPlus /></div>
          <div className="flex justify-center items-center bg-gray-200 rounded-3xl"><FaPlus /></div>
          {/* <img
            className="rounded-3xl 
            col-span-2 row-span-2"
            src={avatar1}
            alt="avatar"
          />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" />
          <img className="rounded-3xl" src={avatar2} alt="avatar" /> */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="h-[75vh] w-[50vw] flex flex-col justify-center items-center gap-4 bg-red-100 rounded-xl shadow-slate-300 shadow-2xl">
          <div className="h-[60vh] w-[33vw] bg-gray-100 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-xl">Drap and Drop your photos here</div>
          <input type="file" onChange={handleSelectFiles} accept="image/*"></input>
        </div>
      )
      }

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
