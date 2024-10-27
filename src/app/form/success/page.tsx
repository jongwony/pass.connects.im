'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Check, Copy } from 'lucide-react';

export default function SuccessPage() {
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

  const router = useRouter();
  const searchParams = useSearchParams()
  const issueCode = searchParams.get('issue_code') || 'No code provided'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">발급코드 입력 안내</h1>
        <Image
          src="/payment.png"
          alt="발급코드 입력 안내"
          width={412}
          height={320}
          className="mx-auto rounded-lg mb-6"
        />
        <p className="text-lg">아래의 발급 코드를 복사해주세요</p>
        <div className="rounded-md">
          <code className="text-gray-400 font-mono">{issueCode}</code>
          <button className="p-2 m-2 bg-gray-800 hover:bg-gray-400 rounded-md" onClick={() => copyToClipboard(issueCode)}>
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        
        <button
          className="w-full mt-4 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400"
          type="submit"
          onClick={() => {
            router.push('https://smartstore.naver.com/passconnect/products/10965709607')
          }}
        >
          스마트스토어에서 구매하기
        </button>
      </div>
    </div>
  )
}