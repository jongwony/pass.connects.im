'use client'

import { Suspense } from 'react';
import GetInfo from './Info';
import Sponsor from '@/app/Sponsor';
import Cancel from './Cancel';


export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">성공적으로 대기열에 등록되었습니다</h1>

      <Suspense>
        <GetInfo />
      </Suspense>

      <div className="p-8 rounded-lg shadow-md w-full text-center">
        <h2 className="text-xl font-bold m-4">
          하루 내에 이메일이 도착할 예정입니다.
        </h2>
        <p>모바일 환경에서 이메일을 확인해 주세요.</p>
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

      <Sponsor />

      <Suspense>
        <Cancel />
      </Suspense>

    </div>
  )
}