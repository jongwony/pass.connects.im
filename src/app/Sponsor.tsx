"use client";
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function Sponsor() {
    const router = useRouter(); // useRouter 훅을 사용하여 라우터 객체를 가져옴
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = useCallback(() => {
        if (!isMobile()) {
            setShowPopup(true);
        }
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className="m-8 border border-gray-400 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <p className="text-gray-400">
                    이 프로젝트는 아래와 같은 문제 인식에서 출발했어요.
                </p>
                <blockquote className="italic font-semibold m-4">
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
                            handleShowPopup();
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
        </>
    )
}
