import { Dispatch, SetStateAction, useEffect } from 'react';
import { useImageContext } from './ImageContext';
import Image from 'next/image'
import { X } from 'lucide-react';

type DisplayCroppedImageProps<T> = {
  setFormData: Dispatch<SetStateAction<T>>;
};

export const DisplayCroppedImage = <T extends object>({ setFormData }: DisplayCroppedImageProps<T>) => {
  const { croppedImage } = useImageContext();

  useEffect(() => {
    if (croppedImage) {
      setFormData(prevData => ({ ...prevData, thumbnail: croppedImage }));
    }
  }, [croppedImage]);

  return (
    <div className="flex justify-center items-center w-full">
      {croppedImage ? (
        <Image src={croppedImage} alt="Cropped" width={90} height={90} className="relative" />
      ) : (
        <div className="w-20 h-20 mx-auto bg-zinc-800 rounded-full flex items-center justify-center">
          <X className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};
