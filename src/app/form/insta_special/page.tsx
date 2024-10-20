"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ImageProvider, useImageContext } from '../ImageContext'
import ProfilePictureUpload from "../Profile";
import { ChevronLeft } from "lucide-react"

interface FormData {
  thumbnail: string | null;
  name: string;
  id: string;
  bio: string;
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
    id: "",
    bio: "",
    code: "",
  });

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
          body: JSON.stringify({ ...formData, type: 'special' }),
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
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-6 text-center">Instagram Special 테마입니다.</h1>

              <div className="flex flex-row space-x-4 space-y-0 justify-center mb-6">
                <div
                  className='relative cursor-pointer ring-2 ring-blue-500 ring-offset-2'
                >
                  <Image alt="Insta1Light" src="/InstaSpecial.png" width={141} height={284} />

                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    className="sr-only"
                    aria-label="Light theme"
                  />
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <ImageProvider>
              <DisplayCroppedImage setFormData={setFormData} />
              <ProfilePictureUpload />
            </ImageProvider>

            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
              <Suspense>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder={searchParams.get('name') || '첫번째 줄에 들어갈 이름입니다.'}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </Suspense>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="id" className="m-2 whitespace-nowrap text-sm font-medium">@ID</label>
              <Suspense>
                <input
                  id="id"
                  name="id"
                  value={formData.id}
                  placeholder={searchParams.get('id') || "두번째 줄에 들어갈 @ID입니다."}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </Suspense>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="bio" className="m-2 whitespace-nowrap text-sm font-medium">소개</label>
              <Suspense>
                <input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  placeholder={searchParams.get('bio') || "세번째 줄에 들어갈 소개란입니다."}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </Suspense>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">QR</label>
              <Suspense>
                <input
                  id="code"
                  name="code"
                  value={formData.code}
                  placeholder={searchParams.get('code') || "QR코드로 나타날 Instagram Profile URL입니다."}
                  onChange={handleChange}
                  className="flex-grow p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </Suspense>
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                type="submit"
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
