// --------- DOM - Approach (vs. Canvas approach) -----------------------------
import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

interface ImageCropperProps {
  imgUrl: string;
}

interface CropArea {
  x: number; // relative to image
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

interface DragStart {
  mouseX: number;
  mouseY: number;
  cropX: number;
  cropY: number;
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

  const [imgArea, setImgArea] = useState<ImgArea>({
    x: 0, // relative to viewport
    y: 0,
    width: 0, // offset width, not real width
    height: 0,
  });

  const [dragStart, setDragStart] = useState<DragStart>({
    mouseX: 0, // mouse coordinate while dragging
    mouseY: 0,
    cropX: 0, // ?
    cropY: 0,
  });

  const imgRef = useRef<HTMLImageElement>(null);

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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragState({ ...dragState, move: true });
    setDragStart({
      ...dragStart,
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!dragState.move) return;
    const deltaX = event.clientX - dragStart.mouseX;
    const deltaY = event.clientY - dragStart.mouseY;
    const newX = cropArea.x + deltaX;
    const newY = cropArea.y + deltaY;
    if (
      newX >= 0 &&
      newX <= imgArea.width - cropArea.width &&
      newY >= 0 &&
      newY <= imgArea.height - cropArea.height
    ) {
      setCropArea({
        ...cropArea,
        x: newX,
        y: newY,
      });
    }
  };

  const throttleHandleMouseMove = throttle(handleMouseMove, 16);

  const handleMouseUp = (event: MouseEvent) => {
    setDragState({ move: false, resize: false });
    setDragStart({
      ...dragStart,
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  };
  useEffect(() => {
    if (dragState.move) {
      document.addEventListener("mousemove", throttleHandleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", throttleHandleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.move]);

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={imgUrl}
        alt="selected_photo"
        onLoad={handleImgLoad}
      />
      <div
        className="absolute bg-transparent border-2 border-dashed border-white cursor-move"
        style={{
          top: `${(cropArea.y / imgArea.height) * 100}%`,
          left: `${(cropArea.x / imgArea.width) * 100}%`,
          width: `${(cropArea.width / imgArea.width) * 100}%`,
          height: `${(cropArea.height / imgArea.height) * 100}%`,
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          clipPath: generateClipPath(cropArea, imgArea.height, imgArea.width),
        }}
      ></div>
    </div>
  );
};
function useCallBack(arg0: (event: MouseEvent) => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
