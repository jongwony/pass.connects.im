"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageProvider, useImageContext } from '../ImageContext'
import ProfilePictureUpload from "../Profile";
import { ChevronLeft } from "lucide-react"

interface FormData {
  thumbnail: string | null;
  name: string;
  id: string;
  bio: string;
  code: string;
  email: string;
}

const DisplayCroppedImage = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
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


const FormPage: React.FC = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    thumbnail: null,
    name: "",
    id: "",
    bio: "",
    code: "",
    email: "",
  });

  // QR 필드가 비어있지 않은지 확인하는 함수
  const validateForm = () => {
    return formData.email !== '' && formData.code !== '';
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
    setIsSubmitting(true);
    setErrorMessage('');
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
      // 응답 성공 시 issue_code로 리다이렉트
      router.push(`/form/success?issue_code=${data.issue_code}`);
    } catch (error) {
      console.error('Error:', error);
      // 실패 시 처리 로직
      setErrorMessage('제출 중 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={sendFormData} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="space-y-4 w-full content-center">
            <button type="button" onClick={() => router.back()}>
              <ChevronLeft />
            </button>
            <div className="mx-auto px-4 py-8">
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
          </div>

          <div className="space-y-4 w-full content-center">
            <div className="items-center space-x-2">
              <label htmlFor="email" className="m-2 whitespace-nowrap text-sm font-medium">이메일</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="이메일로 패스를 보내드립니다."
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                required={true}
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">프로필 링크</label>
              <input
                id="code"
                name="code"
                placeholder="QR Code로 저장됩니다."
                value={formData.code}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                required={true}
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="id" className="m-2 whitespace-nowrap text-sm font-medium">@ID</label>
              <input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="bio" className="m-2 whitespace-nowrap text-sm font-medium">소개</label>
              <input
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="items-center justify-center">
              <button
                className="w-full m-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                type="submit"
                disabled={isSubmitting || isButtonDisabled}
              >
                {isSubmitting ? '처리 중...' : '명함 생성 후 결제하기'}
              </button>
              <small>구매 후 Apple Wallet에 저장할 수 있습니다.</small>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FormPage;
