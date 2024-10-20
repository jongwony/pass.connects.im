"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ImageProvider, useImageContext } from '../ImageContext'
import ProfilePictureUpload from "../Profile";
import { ChevronLeft } from "lucide-react"
import Component from './Theme';

interface FormData {
  thumbnail: string | null;
  name: string;
  role: string;
  company: string;
  joinDate: string;
  code: string;
  theme: "light" | "dark" | undefined;
}

const DisplayCroppedImage = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
  const { croppedImage } = useImageContext();

  useEffect(() => {
    if (croppedImage) {
      setFormData(prevData => ({ ...prevData, thumbnail: croppedImage }));
    }
  }, [croppedImage]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {croppedImage && (
        <div>
          <Image src={croppedImage} alt="Cropped" width={180} height={180} className="relative" />
        </div>
      )}
    </div>
  );
};

const FormPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [formData, setFormData] = useState<FormData>({
    thumbnail: null,
    name: "",
    role: "",
    company: "",
    joinDate: "",
    code: "",
    theme: undefined,
  });


  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 모든 필드가 비어있지 않은지 확인하는 함수
  const validateForm = () => {
    return formData.code !== '';
  };

  // formData가 변경될 때마다 버튼 활성화 상태를 업데이트
  useEffect(() => {
    setIsButtonDisabled(!validateForm());
  }, [formData]);

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
          body: JSON.stringify({...formData, type: '1'}),
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

            <Component 
              initialTheme={searchParams.get('theme') || formData.theme}
              onThemeChange={() => setFormData(prevData => ({...prevData, theme: formData.theme}))}
            />

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
                placeholder={searchParams.get('name') || "첫번째 줄에 들어갈 이름입니다."}
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
                placeholder={searchParams.get('role') || "두번째 줄에 들어갈 직함입니다."}
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
                placeholder={searchParams.get('company') || "세번째 줄에 들어갈 회사명입니다."}
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
                placeholder={searchParams.get('joinDate') || "세번째 줄 우측에 위치할 재직 기간입니다."}
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
                placeholder={searchParams.get('code') || "QR코드로 나타날 LinkedIn URL입니다."}
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                type="submit"
                disabled={isButtonDisabled}
              >
                제출하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FormPage;
