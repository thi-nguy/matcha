import { IoCameraOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Button } from "../../components/Button";
import wave from "../../assets/layered-waves-haikei.svg";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TbListTree } from "react-icons/tb";
import React, { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiMinusCircle } from "react-icons/fi";
import { Tooltip } from "../../components/Tooltip";
import { ImageCropper } from "../../components/ImageCropper";
import camera from "../../assets/camera.jpg";
import { Title } from "../../components/Title";

interface Photo {
  id: string;
  url: string;
  isAvatar: boolean;
}

export const ProfileEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [photoSelectError, setPhotoSelectError] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const MAX_PHOTOS = 4;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  const handleFileValidation = (file: File): string | null => {
    if (file.size > MAX_SIZE) {
      return `The image size is too large. Please ensure it does not exceed ${
        MAX_SIZE / 1024 / 1024
      }MB`;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only accept photos of type JPG, JPEG or PNG";
    }
    return null;
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file) return;

    const validationError = handleFileValidation(file);
    if (validationError) {
      setPhotoSelectError(validationError);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setPhotoSelectError(undefined);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setPhotoSelectError("An error occurred while uploading the image");
    }
  };

  const handleSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = handleFileValidation(file);
    if (validationError) {
      setPhotoSelectError(validationError);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setPhotoSelectError(undefined);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setPhotoSelectError("An error occurred while uploading the image");
    }
  };

  const handleSetAsAvatar = (photoId: string) => {
    setPhotoList(
      photoList.map((photo) => ({ ...photo, isAvatar: photo.id === photoId }))
    );
  };

  const handleRemovePhoto = (photoId: string) => {
    const updatedPhotoList = photoList.filter((photo) => photo.id !== photoId);
    if (
      photoList.find((photo) => photo.id === photoId)?.isAvatar &&
      updatedPhotoList.length > 0
    ) {
      updatedPhotoList[0].isAvatar = true;
    }
    setPhotoList(updatedPhotoList);
  };

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
          {photoList.map((onePhoto, index) => {
            return (
              <div className="relative">
                {onePhoto.isAvatar ? (
                  <img
                    key={index}
                    className="rounded-3xl object-cover"
                    src={onePhoto.url}
                    alt="user_avatar"
                  ></img>
                ) : (
                  <img
                    key={index}
                    className="rounded-3xl object-cover"
                    src={onePhoto.url}
                    alt="user_photo"
                  />
                )}
                <div
                  key={index}
                  className="absolute top-0 right-0 flex gap-2 bg-black bg-opacity-50 rounded-lg"
                >
                  <Tooltip
                    content="Use as avatar"
                    activate={onePhoto.isAvatar ? false : true}
                  >
                    <RxAvatar
                      className={`text-2xl cursor-pointer ${
                        onePhoto.isAvatar
                          ? "text-yellow-400"
                          : "text-white hover:text-yellow-400"
                      }`}
                      onClick={() => handleSetAsAvatar(onePhoto.id)}
                    />
                  </Tooltip>
                  <Tooltip content="Remove photo">
                    <FiMinusCircle
                      className="text-2xl cursor-pointer text-white hover:text-red-500 "
                      onClick={() => handleRemovePhoto(onePhoto.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
          {photoList.length < MAX_PHOTOS && (
            <div
              className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-3xl "
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="text-2xl text-gray-600" />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center">
          {selectedImage ? (
            <ImageCropper imgUrl={selectedImage} />
          ) : (
            <div
              className="w-[50vw] flex flex-col justify-center items-center gap-4 rounded-xl bg-white shadow-slate-300 shadow-2xl p-4"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <IoMdClose
                className="text-2xl hover:scale-150 transition-transform self-end"
                onClick={() => {
                  setIsModalOpen(false);
                  setPhotoSelectError(undefined);
                }}
              />

              <h2 className="text-2xl font-bold">Upload your photo</h2>

              <div
                className={`h-[60vh] w-[33vw] bg-gray-100 hover:bg-gray-200 border-2 border-dashed rounded-xl flex flex-col justify-center items-center gap-4 ${
                  isDragging ? `border-blue-400 bg-blue-200` : `border-gray-400`
                }`}
              >
                <FaPlus className="text-2xl text-gray-600" />
                <p>Drag and Drop your photo here or</p>
                <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                  <span>Select from your device</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSelectFiles}
                    accept="image/*"
                  ></input>
                </label>
                {photoSelectError && (
                  <p className="text-red-500 font-bold">{photoSelectError}</p>
                )}
              </div>

              <div className="text-sm text-gray-600">
                <p>• Accepted File: JPG, JPEG, PNG</p>
                <p>• Size Max: 5MB</p>
                <p>• Max Number of photos: {MAX_PHOTOS}</p>
              </div>

              <div className="flex gap-4">
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setPhotoSelectError(undefined);
                  }}
                >
                  Cancel
                </Button>
                <Button size="small" color="primary">
                  Upload
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description Section */}
      <div>
        <div className="flex items-center gap-2 text-3xl font-bold m-4">
          <BiSolidQuoteAltLeft />
          <span>My description</span>
        </div>
        <textarea
          rows={4}
          maxLength={2000}
          placeholder="My hobbies, my passion..."
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        ></textarea>

        <div className="flex items-center gap-2 text-3xl font-bold m-4">
          <TbListTree />
          <span>I am</span>
        </div>
        <textarea
          rows={4}
          maxLength={2000}
          placeholder="My hobbies, my passion..."
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        ></textarea>

        <div className="flex items-center gap-2 text-3xl font-bold m-4">
          <TbListTree />
          <span>I am looking for</span>
        </div>
        <textarea
          rows={4}
          maxLength={2000}
          placeholder="My hobbies, my passion..."
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        ></textarea>
      </div>
    </div>
  );
};
