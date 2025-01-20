"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ImageProvider } from './ImageContext';
import { DisplayCroppedImage } from './CropImage';
import ProfilePictureUpload from './Profile';
import ChooseTemplate from './Template';
import { FormDataTypes, Insta1Form, InstaSpecialForm, Linkedin1Form, Linkedin2Form, KakaopayForm } from './Types';
import { MessageCircleQuestion } from 'lucide-react';

const templates = [
  {
    id: 'kakaopay1',
    name: 'KakaoPay: 로고가 가운데에 있는 템플릿',
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

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
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
            <ImageProvider>
              <DisplayCroppedImage setFormData={setFormData} />
              <ProfilePictureUpload />
            </ImageProvider>

            <div className="items-center space-x-2">
              <label htmlFor="email" className="m-2 whitespace-nowrap text-sm font-medium">이메일 <span className="text-red-500 font-semibold">*</span></label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="이메일로 패스를 보내드립니다."
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                required={true}
              />
            </div>
            <div className="items-center space-x-2">
              <label htmlFor="code" className="m-2 whitespace-nowrap text-sm font-medium">
                {isKakaoPayForm(formData) ? (
                  <>
                    <span>
                      송금 QR 코드
                    </span>
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
                      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
                        <video className="rounded-2xl w-64 object-cover" autoPlay loop muted>
                          <source src="/get_kakao_url_guide.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        <div className="text-center">
                          <p className="font-semibold">
                            카톡 더보기 &gt; Kakao Pay &gt; 페이머니 &gt; 송금코드 &gt; 링크복사
                          </p>
                          <p className="text-gray-500">
                            복사한 송금 QR 링크를 이곳에 붙여넣기 해주세요.
                          </p>
                        </div>

                        <button
                          onClick={handlePopupToggle}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                          type="button"
                        >
                          닫기
                        </button>
                      </div>
                    )}
                  </>
                ) : (
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
                className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
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
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
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
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="name" className="m-2 whitespace-nowrap text-sm font-medium">이름</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="bio" className="m-2 whitespace-nowrap text-sm font-medium">소개</label>
                  <input
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
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
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="role" className="m-2 whitespace-nowrap text-sm font-medium">직함</label>
                  <input
                    id="role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="items-center space-x-2">
                  <label htmlFor="company" className="m-2 whitespace-nowrap text-sm font-medium">회사</label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
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
                      className="w-full p-2 rounded-md placeholder-zinc-600 bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                )}
              </>
            )}

            <div className="items-center justify-center">
              <button
                className="w-full m-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '처리 중...' : '대기열 등록하기'}
              </button>
              <small>결과물을 곧 이메일로 보내드리니, 모바일에서 확인해보세요.</small>

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