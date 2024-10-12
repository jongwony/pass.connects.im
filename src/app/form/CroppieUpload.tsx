"use client"
import React, { useState } from 'react';
import CroppieComponent from './CroppieComponent';


const Crop: React.FC = () => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target && e.target.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCrop = (croppedImage: string) => {
    setCroppedImage(croppedImage);
  };

  return (
    <div>
      <h1 className="text-gray-600 font-bold text-xl">이미지 수정</h1>
      <hr></hr>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <CroppieComponent imageUrl={imageUrl} onCrop={handleCrop} />}
      {croppedImage && (
        <div>
          <h2>자른 이미지:</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default Crop;