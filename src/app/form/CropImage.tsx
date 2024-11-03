import { Dispatch, SetStateAction, useEffect } from 'react';
import { useImageContext } from './ImageContext';
import Image from 'next/image'

type DisplayCroppedImageProps<T> = {
  setFormData: Dispatch<SetStateAction<T>>;
};

export const DisplayCroppedImage = <T extends {}>({ setFormData }: DisplayCroppedImageProps<T>) => {
  const { croppedImage } = useImageContext();

  useEffect(() => {
    if (croppedImage) {
      setFormData(prevData => ({ ...prevData, thumbnail: croppedImage }));
    }
  }, [croppedImage]);

  return (
    <div className="flex justify-center items-center w-full">
      {croppedImage && (
        <div>
          <Image src={croppedImage} alt="Cropped" width={90} height={90} className="relative" />
        </div>
      )}
    </div>
  );
};
