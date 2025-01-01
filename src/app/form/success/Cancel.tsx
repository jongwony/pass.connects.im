import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const Cancel: React.FC = () => {
  const searchParams = useSearchParams()
  const issueCode = searchParams.get('issue_code') || 'No code provided'

  const handleCancel = async (issueCode: string) => {
    try {
      const response = await fetch(
        `https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/pass_connect/cancel/${issueCode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to cancel the request');
      }
      alert('취소되었습니다.');
      window.history.back();
    } catch (error) {
      console.error('Error:', error);
      alert('취소하는 데 실패했습니다.');
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold m-4">생각했던 결과가 아닌가요?</h2>
      <p>대기열에 추가된 이메일이 발송되기 전까지 결과물 받는 것을 취소하고 다시 요청할 수 있습니다</p>
      <div className="text-center mt-4">
        <Suspense>
          <button
            onClick={() => handleCancel(issueCode)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            취소하기
          </button>
        </Suspense>
      </div>
    </>
  )
}

export default Cancel;