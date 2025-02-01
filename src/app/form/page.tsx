"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImageProvider } from './ImageContext';
import { DisplayCroppedImage } from './CropImage';
import ProfilePictureUpload from './Profile';
import ChooseTemplate from './Template';
import { FormDataTypes, Insta1Form, InstaSpecialForm, Linkedin1Form, Linkedin2Form, KakaopayForm, TosspayForm } from './Types';
import { MessageCircleQuestion } from 'lucide-react';

const templates = [
  {
    id: 'tosspay1',
    name: 'Toss: 로고가 가운데 있는 템플릿',
    src: '/tosspay1.png',
    dark: '',
    light: '',
  },
  {
    id: 'kakaopay1',
    name: 'KakaoPay: 로고가 가운데 있는 템플릿',
    src: '/kakaopay1.png',
    dark: '',
    light: '',
  },
  {
    id: 'linkedin3',
    name: 'LinkedIn: 가운데 정렬된 템플릿',
    src: '',
    dark: '/Linkedin3Dark.png',
    light: '/Linkedin3Light.png',
  },
  {
    id: 'linkedin2',
    name: 'LinkedIn: 직무를 강조하는 템플릿',
    src: '',
    dark: '/Linkedin2Dark.png',
    light: '/Linkedin2Light.png',
  },
  {
    id: 'linkedin1',
    name: 'LinkedIn: 근무기간을 포함하는 템플릿',
    src: '',
    dark: '/Linkedin1Dark.png',
    light: '/Linkedin1Light.png',
  },
  {
    id: 'insta_special',
    name: 'Instagram: 컬러풀한 템플릿',
    src: '/InstaSpecial.png',
    dark: '',
    light: '',
  },
  {
    id: 'insta1',
    name: 'Instagram: 깔끔한 템플릿',
    src: '',
    dark: '/Insta1Dark.png',
    light: '/Insta1Light.png',
  },
];

const FormPage = (): React.ReactElement => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataTypes>(() => ({} as FormDataTypes));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    console.log('test', showPopup)
    setShowPopup(prevState => !prevState);
  };

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
      let endpoint = '';
      switch (formData.template) {
        case 'insta1':
        case 'insta_special':
          endpoint = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/instagram';
          break;
        case 'linkedin1':
        case 'linkedin2':
        case 'linkedin3':
          endpoint = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/linkedin';
          break;
        case 'kakaopay1':
        case 'kakaopay2':
          endpoint = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/kakaopay';
          break;
        case 'tosspay1':
          endpoint = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/tosspay';
          break;
        default:
          endpoint = 'https://your-api.com/api/default';
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      router.push(`/form/success?issue_code=${data.issue_code}`);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('제출 중 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 타입 가드 함수 추가
  const isInstaForm = (data: FormDataTypes): data is Insta1Form | InstaSpecialForm => {
    return data.template === 'insta1' || data.template === 'insta_special';
  };

  const isLinkedin1Form = (data: FormDataTypes): data is Linkedin1Form => {
    return data.template === 'linkedin1';
  };

  const isLinkedin2Form = (data: FormDataTypes): data is Linkedin2Form => {
    return data.template === 'linkedin2' || data.template === 'linkedin3';
  };

  const isKakaoPayForm = (data: FormDataTypes): data is KakaopayForm => {
    return data.template === 'kakaopay1';
  }

  const isTossPayForm = (data: FormDataTypes): data is TosspayForm => {
    return data.template === 'tosspay1';
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={sendFormData} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <ChooseTemplate
            templates={templates}
            onThemeChange={theme => setFormData(prevData => ({ ...prevData, theme }))}
            onTemplateChange={(template) => {
              setFormData(prevData => ({ ...prevData, template }));
            }}
          />

          <div className="space-y-4 w-full content-center">
            {!isTossPayForm(formData) && (
              <ImageProvider>
                <DisplayCroppedImage setFormData={setFormData} />
                <ProfilePictureUpload />
              </ImageProvider>
            )}

            <div className="items-center space-x-2">
              <label htmlFor="email" className="m-2 whitespace-nowrap text-sm font-medium">이메일 <span className="text-red-500 font-semibold">*</span></label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="이메일로 패스를 보내드립니다."
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                required={true}
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">
                {
                isTossPayForm(formData) && (
                  <>
                    송금 계좌
                    <span className="text-red-500 font-semibold"> * </span>

                    <button
                      onClick={handlePopupToggle}
                      className="text-blue-500"
                      type="button"
                    >
                      <MessageCircleQuestion className="text-gray-400" />
                    </button>

                    <span className="text-xs text-gray-500">
                      이메일이 발송되는 즉시 계좌번호는 삭제됩니다.
                    </span>

                    {/* 팝업 표시 */}
                    {showPopup && (
                      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-opacity-70 backdrop-blur-sm">
                        <Image src="/get_toss_url_guide.png" width={282} height={568} alt="Toss 계좌 정보 복사 가이드" />

                        <div className="text-center p-4 rounded-lg bg-zinc-200 dark:bg-zinc-800">
                          <p className="font-semibold mb-2">
                            홈 &gt; 연결 계좌 선택 &gt; 계좌 정보 복사
                          </p>
                          <p className="text-gray-500">
                            잔액이 표시된 화면에서 계좌 정보를 눌러 <br/> 복사한 계좌 정보를 이곳에 붙여넣기 해주세요.
                          </p>
                        </div>

                        <button
                          onClick={handlePopupToggle}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-opacity-80 transition-colors"
                          type="button"
                        >
                          닫기
                        </button>
                      </div>
                    )}
                  </>
                )}

                {isKakaoPayForm(formData) && (
                  <>
                    송금 링크
                    <span className="text-red-500 font-semibold"> * </span>
                    <button
                      onClick={handlePopupToggle}
                      className="text-blue-500"
                      type="button"
                    >
                      <MessageCircleQuestion className="text-gray-400" />
                    </button>

                    {/* 팝업 표시 */}
                    {showPopup && (
                      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-opacity-70 backdrop-blur-sm">
                        <video className="rounded-2xl w-64 object-cover" autoPlay loop muted>
                          <source src="/get_kakao_url_guide.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        <div className="text-center p-4 rounded-lg bg-zinc-200 dark:bg-zinc-800">
                          <p className="font-semibold mb-2">
                            카톡 더보기 &gt; Kakao Pay &gt; 페이머니 &gt; 송금코드 &gt; 링크복사
                          </p>
                          <p className="text-gray-500">
                            복사한 송금 QR 링크를 이곳에 붙여넣기 해주세요.
                          </p>
                        </div>

                        <button
                          onClick={handlePopupToggle}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-opacity-80 transition-colors"
                          type="button"
                        >
                          닫기
                        </button>
                      </div>
                    )}
                  </>
                )}

                {!isTossPayForm(formData) && !isKakaoPayForm(formData) && (
                  <>
                    프로필 링크
                    <span className="text-red-500 font-semibold"> *</span>
                  </>
                )}
              </label>
              <input
                id="code"
                name="code"
                value={formData.code || ''}
                placeholder="QR Code로 저장됩니다."
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                required={true}
              />
            </div>

            {/* Kakao Pay 폼 필드 */}
            {isKakaoPayForm(formData) && (
              <>
                <div className="items-center space-x-2">
                  <label htmlFor="id" className="m-2 whitespace-nowrap text-sm font-medium">텍스트</label>
                  <input
                    id="text"
                    name="text"
                    value={formData.text || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </>
            )}

            {/* Insta 폼 필드 */}
            {isInstaForm(formData) && (
              <>
                <div className="items-center space-x-2">
                  <label htmlFor="id" className="m-2 whitespace-nowrap text-sm font-medium">아이디</label>
                  <input
                    id="id"
                    name="id"
                    value={formData.id || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="bio" className="m-2 whitespace-nowrap text-sm font-medium">소개</label>
                  <input
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </>
            )}

            {/* LinkedIn 폼 필드 */}
            {(isLinkedin1Form(formData) || isLinkedin2Form(formData)) && (
              <>
                <div className="items-center space-x-2">
                  <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="role" className="m-2 whitespace-nowrap text-sm font-medium">직함</label>
                  <input
                    id="role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="company" className="m-2 whitespace-nowrap text-sm font-medium">회사</label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                {isLinkedin1Form(formData) && (
                  <div className="items-center space-x-2">
                    <label htmlFor="joinDate" className="m-2 whitespace-nowrap text-sm font-medium">근무 기간</label>
                    <input
                      id="joinDate"
                      name="joinDate"
                      value={formData.joinDate || ''}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-200 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                )}
              </>
            )}

            <div className="items-center justify-center">
              <button
                className="w-full m-2 p-2 text-white bg-blue-500 rounded-md hover:bg-opacity-80 transition-colors disabled:bg-gray-400"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '처리 중...' : '대기열 등록하기'}
              </button>
              <small className="m-2">결과물을 곧 이메일로 보내드리니, 모바일에서 확인해보세요.</small>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormPage;