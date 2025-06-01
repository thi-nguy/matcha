import { IoCameraOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Button } from "../../components/Button";
import avatar1 from "../../assets/avatar1.jpeg";
import avatar2 from "../../assets/avatar2.jpeg";
import avatar3 from "../../assets/avatar3.jpeg";
import wave from "../../assets/layered-waves-haikei.svg";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TbListTree } from "react-icons/tb";
import { ChangeEvent, MouseEvent, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiMinusCircle } from "react-icons/fi";
import { Tooltip } from "../../components/Tooltip";
import camera from "../../assets/camera.jpg"
import { Title } from "../../components/Title";

export const ProfileEdit = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string[]>(Array(4).fill(null));

  const photoList = [
    { src: avatar3 },
    { src: avatar3 },
    { src: "" },
    { src: "" },
  ];

  const handleSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const photoSelected = event.target.files?.[0];
    if (photoSelected) {
      const url = URL.createObjectURL(photoSelected);
    }
  }
  const handleCloseModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }
  const handleOpenModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
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
          <img src={avatar2} alt="avatar" className="col-span-2 row-span-2 rounded-3xl object-cover" />

          {photoList.map((onePhoto, index) => {
            return (onePhoto.src ? (<div className="relative">
              <img key={index} className="rounded-3xl object-cover" src={onePhoto.src} alt="user_photo" />
              <div key={index} className="absolute top-0 right-0 flex gap-2">
                <Tooltip content="Use as avatar" >
                  <RxAvatar className="text-2xl hover:text-3xl text-gray-600" />
                </Tooltip>
                <Tooltip content="Remove photo">
                  <FiMinusCircle className="text-2xl hover:text-3xl text-gray-600" />
                </Tooltip>
              </div></div>) : (<div className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-3xl " onClick={handleOpenModal}><FaPlus className="text-2xl text-gray-600" /></div>)
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center">

          <div className="h-2/3 w-1/2 flex flex-col justify-center items-center gap-4 rounded-3xl bg-white shadow-slate-300 shadow-2xl p-4">
            <IoMdClose className="self-end hover:scale-150 transition-transform" onClick={handleCloseModal} />
            <img src={camera} alt="camera" className="h-[20vh] rounded-3xl" />
            <Title value="A photo that clearly shows your face. Includes you only. Free from offensive content"></Title>
            <p>Upload a photo to get more attention.</p>
            <div className="h-1/3 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col justify-center items-center rounded-xl p-4">
              <p>Drop your picture here or</p>
              <p className="underline">upload it from your computer</p>
              <input type="file" onChange={handleSelectFiles} accept="image/*" className="hidden"></input>
            </div>
            <Button size="small" color="secondary" onClick={handleCloseModal}>Cancel</Button>
          </div>
        </div>
      )
      }

      {/* Description Section */}
      <div>
        <div className="flex items-center gap-2 text-3xl font-bold">
          <BiSolidQuoteAltLeft />
          <span>My description</span>
        </div>
        <textarea rows={5} className="w-full p-2 border border-gray-300 rounded" placeholder="My personality, my expectations, my passion..."></textarea>
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
