"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react';

const Cancel: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const issueCode = searchParams.get('issue_code') || 'No code provided';
  const from = searchParams.get('utm_medium') || 'No source provided';
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleCancel = async (issueCode: string) => {
    try {
      const response = await fetch(
        `https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/pass_connect/${issueCode}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to cancel the request');
      }
      alert('삭제되었습니다.');
      router.back();
    } catch (error) {
      console.error('Error:', error);
      alert('삭제하는 데 실패했습니다. pass.connects.im@gmail.com으로 문의해주세요.');
    }
  };

  const handleShowConfirmPopup = () => {
    setShowConfirmPopup(true);
  };

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  return (
    <>
      {from === 'email' ? (
        <>
          <h2 className="text-xl font-bold mt-8 text-center">개인정보를 보호할 수 있습니다</h2>
          <p className='mt-4 font-semibold'>이메일을 이미 받으셨다면 개인정보보호를 위해 결과를 영구적으로 삭제할 수 있습니다.</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mt-8 text-center">잘못된 부분이 있다면, 다시 만들어 주세요</h2>
          <p className='mt-4'>이메일을 받기 전까지 결과를 삭제할 수 있습니다.</p>
        </>
      )}
      <div className="text-center m-4">
        <button
          onClick={handleShowConfirmPopup}
          className={`bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-opacity-80 transition-colors`}
        >
          삭제하기
        </button>
      </div>

      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">정말 삭제하시겠습니까?</h2>
            <p className="mb-8">이 작업은 되돌릴 수 없습니다.</p>
            <div className="space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                onClick={handleCloseConfirmPopup}
              >
                취소
              </button>
              <button
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-80 transition-colors`}
                onClick={() => handleCancel(issueCode)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cancel;