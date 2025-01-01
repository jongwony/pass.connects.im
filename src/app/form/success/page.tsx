'use client'
import { Suspense } from 'react';
import GetInfo from './Info';
import Sponsor from '@/app/Sponsor';
import Cancel from './Cancel';
import EmailGuide from './Guide';


export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">성공적으로 대기열에 등록되었습니다</h1>

      <Suspense>
        <GetInfo />
      </Suspense>

      <Suspense>
        <EmailGuide />
      </Suspense>

      <Sponsor />

      <Suspense>
        <Cancel />
      </Suspense>
    </div>
  )
}