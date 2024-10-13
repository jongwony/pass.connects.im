"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageProvider, useImageContext } from './ImageContext'
import ProfilePictureUpload from "./Profile";
import { ChevronLeft } from "lucide-react"

interface FormData {
  thumbnail: string | null;
  primaryField: string;
  secondaryFields: string;
  auxiliaryFields: string;
  barcode: string;
}

const DisplayCroppedImage = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
  const { croppedImage } = useImageContext();

  useEffect(() => {
    if (croppedImage) {
      setFormData(prevData => ({ ...prevData, thumbnail: croppedImage }));
    }
  }, [croppedImage]);

  return (
    <div>
      {croppedImage && (
        <div>
          <Image src={croppedImage} alt="Cropped" width={128} height={128} className="rounded-full" />
        </div>
      )}
    </div>
  );
};


const FormPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    thumbnail: null,
    primaryField: '',
    secondaryFields: '',
    auxiliaryFields: '',
    barcode: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const sendFormData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={sendFormData}>
          <div className="w-full max-w-md justify-between space-y-4">
            <button type="button" onClick={() => router.back()}>
              <ChevronLeft />
            </button>
            <h1 className="text-2xl font-bold mb-6">LinkedIn 템플릿</h1>
            <ImageProvider>
              <DisplayCroppedImage setFormData={setFormData} />
              <ProfilePictureUpload />
            </ImageProvider>
            <div className="space-y-2">
              <label htmlFor="primaryField" className="m-2 text-sm font-medium">이름</label>
              <input
                id="primaryField"
                name="primaryField"
                value={formData.primaryField}
                onChange={handleChange}
                className="p-2 rounded-md bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="secondaryFields" className="m-2 text-sm font-medium">직함</label>
              <input
                id="secondaryFields"
                name="secondaryFields"
                value={formData.secondaryFields}
                onChange={handleChange}
                className="p-2 rounded-md bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="auxiliaryFields" className="m-2 text-sm font-medium">소개</label>
              <input
                id="auxiliaryFields"
                name="auxiliaryFields"
                value={formData.auxiliaryFields}
                onChange={handleChange}
                className="p-2 rounded-md bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="barcode" className="m-2 text-sm font-medium">QR 코드</label>
              <input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="p-2 rounded-md bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                type="submit"
              >
                결정
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FormPage;
