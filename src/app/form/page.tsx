"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageProvider, useImageContext } from './ImageContext'
import ProfilePictureUpload from "./Profile";
import { ChevronLeft } from "lucide-react"

interface FormData {
  thumbnail: string | null;
  name: string;
  role: string;
  company: string;
  joinDate: string;
  code: string;
}

const DisplayCroppedImage = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
  const { croppedImage } = useImageContext();

  useEffect(() => {
    if (croppedImage) {
      setFormData(prevData => ({ ...prevData, thumbnail: croppedImage }));
    }
  }, [croppedImage]);

  return (
    <div className="relative justify-center items-center w-full h-full">
      {croppedImage && (
        <div>
          <Image src={croppedImage} alt="Cropped" width={180} height={180} className="relative"/>
        </div>
      )}
    </div>
  );
};


const FormPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    thumbnail: null,
    name: "",
    role: "",
    company: "",
    joinDate: "",
    code: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const sendFormData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    try {
      const response = await fetch(
        'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/linkedin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // 성공 시 처리 로직
    } catch (error) {
      console.error('Error:', error);
      // 실패 시 처리 로직
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={sendFormData} className="w-full max-w-md">
          <div className="space-y-4">
            <button type="button" onClick={() => router.back()}>
              <ChevronLeft />
            </button>
            <h1 className="text-2xl font-bold mb-6">LinkedIn 템플릿</h1>
            <ImageProvider>
              <DisplayCroppedImage setFormData={setFormData} />
              <ProfilePictureUpload />
            </ImageProvider>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                placeholder="첫번째 줄에 들어갈 이름입니다."
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="role" className="m-2 whitespace-nowrap text-sm font-medium">직함</label>
              <input
                id="role"
                name="role"
                value={formData.role}
                placeholder="두번째 줄에 들어갈 직함입니다."
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="company" className="m-2 whitespace-nowrap text-sm font-medium">회사</label>
              <input
                id="company"
                name="company"
                value={formData.company}
                placeholder="세번째 줄에 들어갈 회사명입니다."
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="joinDate" className="m-2 whitespace-nowrap text-sm font-medium">기간</label>
              <input
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                placeholder="세번째 줄 우측에 위치할 재직 기간입니다."
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">QR</label>
              <input
                id="code"
                name="code"
                value={formData.code}
                placeholder="QR코드로 나타날 LinkedIn URL입니다."
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
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
