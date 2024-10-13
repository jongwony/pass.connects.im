"use client"
import React from 'react';
import Image from 'next/image';
import { ImageProvider, useImageContext } from './ImageContext'
import ProfilePictureUpload from "./Profile";


const DisplayCroppedImage = () => {
  const { croppedImage } = useImageContext()

  return (
    <div>
      {croppedImage && (
        <div>
          <h3>크롭된 이미지:</h3>
          <Image src={croppedImage} alt="Cropped" width={128} height={128} className="rounded-full" />
        </div>
      )}
    </div>
  )
}

const FormPage: React.FC = () => {
  return (
    <div>
      <h1>Form 페이지</h1>
      <p>이곳은 Form 페이지입니다.</p>
      <ImageProvider>
        <ProfilePictureUpload />
        <DisplayCroppedImage />
      </ImageProvider>
    </div>
  );
};

export default FormPage;