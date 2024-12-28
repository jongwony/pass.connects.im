'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';
import DynamicBuyerConfirmation from './Confirm';

const CopyIssueCode: React.FC = () => {
  const searchParams = useSearchParams()
  const issueCode = searchParams.get('issue_code') || 'No code provided'

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2초 후 초기화
    } catch (error) {
      console.error('Failed to copy: ', error);
      setIsCopied(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 p-2 m-4 rounded-md shadow-sm">
      <code className="text-gray-400 font-mono">{issueCode}</code>
      <button className="p-2 m-2 bg-gray-600 hover:bg-gray-400 rounded-md" onClick={() => copyToClipboard(issueCode)}>
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function SuccessPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isMobile()) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">성공적으로 대기열에 등록되었습니다</h1>

      <DynamicBuyerConfirmation />

      <div className="p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold m-4">
          모바일 환경에서 이메일을 열어주세요.
        </h2>
        <p>첨부된 파일을 탭하여 따로 앱 설치 없이 Apple 지갑에 추가할 수 있습니다.</p>
      </div>

      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <video className="w-full rounded-md" autoPlay loop muted>
          <source src="/add_pass.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold m-4 text-center">Apple 지갑에 추가하는 방법</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>iPhone 또는 iPad</strong>에서 이메일을 열어주세요.</li>
          <li>첨부된 파일인 <em>PassConnect.pkpass</em>를 탭합니다.</li>
          <li>나타나는 화면 오른쪽 상단에 있는 <strong>추가</strong> 버튼을 눌러 Apple 지갑에 추가합니다.</li>
        </ol>
      </div>

      <div className="p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold m-4">문제가 발생했어요</h2>
        <p>아래의 발급 코드를 통해 <br /> <Link href="mailto:pass.connects.im@gmail.com" className="text-blue-500 underline">pass.connects.im@gmail.com</Link>로 문의해 주세요</p>

        <Suspense>
          <CopyIssueCode />
        </Suspense>
      </div>

      <div className="m-8 border border-gray-400 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-gray-400">
          이 프로젝트는 아래와 같은 문제 인식에서 출발했어요.
        </p>
        <blockquote className="italic m-4">
          내 프로필 페이지를 소개하는데 <br /> 모두가 내 아이디를 검색하는 일이 번거롭다.
        </blockquote>
        <p className="text-gray-400 mb-2">
          하지만 서비스 운영을 위한 비용, 그리고 Apple Developer Program 연회비로 99달러의 비용을 부담하게 되었어요.
        </p>
        <p className="mb-4">
          서비스가 꾸준히 이어질 수 있도록 따뜻한 응원을 보내주시면 정말 감사하겠습니다.
        </p>
        <button
          className="w-full my-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          type="submit"
          onClick={() => {
            if (isMobile()) {
              router.push('supertoss://send?amount=2000&bank=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC&accountNo=100007643029&origin=qr');
            } else {
              setShowPopup(true);
            }
          }}
        >
          토스로 2000원 후원하기
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">모바일 환경에서 이용해 주세요</h2>
            <p className="mb-4">이 기능은 모바일 환경에서 토스 앱을 사용해야 합니다. 모바일 기기에서 요청해 주세요.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleClosePopup}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}