// --------- DOM - Approach (vs. Canvas approach) -----------------------------
import { useRef, useState } from "react";

interface ImageCropperProps {
  imgUrl: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImgArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragState {
  move: boolean;
  resize: boolean;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imgUrl }) => {
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 150,
    y: 150,
    width: 250,
    height: 200,
  });

  const [dragState, setDragState] = useState<DragState>({
    move: false,
    resize: false,
  });

  const imgRef = useRef<HTMLImageElement>(null);

  const [imgArea, setImgArea] = useState<ImgArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleImgLoad = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setImgArea({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const generateClipPath = (cropArea: CropArea, imgH: number, imgW: number) => {
    const leftPercent = `${(cropArea.x / imgW) * 100}%`;
    const topPercent = `${(cropArea.y / imgH) * 100}%`;
    const rightPercent = `${((cropArea.x + cropArea.width) / imgW) * 100}%`;
    const bottomPercent = `${((cropArea.y + cropArea.height) / imgH) * 100}%`;
    return `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${leftPercent} ${topPercent}, ${leftPercent} ${bottomPercent}, ${rightPercent} ${bottomPercent}, ${rightPercent} ${topPercent}, ${leftPercent} ${topPercent})`;
  };

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={imgUrl}
        alt="selected_photo"
        onLoad={handleImgLoad}
      />
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          clipPath: generateClipPath(cropArea, imgArea.height, imgArea.width),
        }}
      ></div>
    </div>
  );
};
