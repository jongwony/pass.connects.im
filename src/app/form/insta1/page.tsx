"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageProvider, useImageContext } from '../ImageContext'
import ProfilePictureUpload from "../Profile";
import { ChevronLeft } from "lucide-react"
import Component from './Theme';

interface FormData {
  thumbnail: string | null;
  name: string;
  id: string;
  bio: string;
  code: string;
  email: string;
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


  const [formData, setFormData] = useState<FormData>({
    thumbnail: null,
    name: "",
    id: "",
    bio: "",
    code: "",
    email: "",
    theme: undefined,
  });


  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // QR, theme 필드가 비어있지 않은지 확인하는 함수
  const validateForm = () => {
    return formData.email !== '' && formData.theme !== undefined && formData.code !== '';
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
        'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/instagram',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, type: '1' }),
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
              initialTheme={formData.theme}
              onThemeChange={(theme) => setFormData(prevData => ({...prevData, theme}))}
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
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="id" className="m-2 whitespace-nowrap text-sm font-medium">@ID</label>
                <input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="bio" className="m-2 whitespace-nowrap text-sm font-medium">소개</label>
                <input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">프로필링크</label>
                <input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="email" className="m-2 whitespace-nowrap text-sm font-medium">이메일</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="이메일로 패스를 보내드립니다."
                value={formData.email}
                onChange={handleChange}
                className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                className="flex-grow mt-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
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
