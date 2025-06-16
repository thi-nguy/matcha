import React, { useRef, useState, useEffect } from "react";

interface ImageCropper2Props {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageCropper2: React.FC<ImageCropper2Props> = ({
  image,
  onCropComplete,
  onCancel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (canvasRef.current && imageRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Căn giữa vùng crop
          setCropArea({
            x: (img.width - 200) / 2,
            y: (img.height - 200) / 2,
            width: 200,
            height: 200,
          });
        }
      }
    };
  }, [image]);

  const drawOverlay = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Xóa canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Vẽ lại ảnh gốc
        if (imageRef.current) {
          ctx.drawImage(imageRef.current, 0, 0);
        }

        // Vẽ overlay tối
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Xóa phần trong vùng crop để hiện ảnh
        ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // Vẽ viền vùng crop
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
      }
    }
  };

  useEffect(() => {
    drawOverlay();
  }, [cropArea]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Kiểm tra xem click có trong vùng crop không
      if (
        x >= cropArea.x &&
        x <= cropArea.x + cropArea.width &&
        y >= cropArea.y &&
        y <= cropArea.y + cropArea.height
      ) {
        setIsDragging(true);
        setStartPos({ x: x - cropArea.x, y: y - cropArea.y });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let newX = x - startPos.x;
      let newY = y - startPos.y;

      // Giới hạn vùng crop trong canvas
      newX = Math.max(0, Math.min(newX, canvas.width - cropArea.width));
      newY = Math.max(0, Math.min(newY, canvas.height - cropArea.height));

      setCropArea((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    if (canvasRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      if (ctx && imageRef.current) {
        ctx.drawImage(
          imageRef.current,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );

        const croppedImage = canvas.toDataURL("image/jpeg");
        onCropComplete(croppedImage);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            className="max-h-[70vh] max-w-[70vw]"
          />
          <img ref={imageRef} src={image} alt="Original" className="hidden" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cắt ảnh
          </button>
        </div>
      </div>
    </div>
  );
};
