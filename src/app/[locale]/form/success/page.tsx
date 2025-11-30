'use client'
import { Suspense } from 'react';
import GetInfo from './Info';
import Sponsor from '@/app/[locale]/Sponsor';
import EmailGuide from './Guide';


export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense>
        <GetInfo />
      </Suspense>

      <Suspense>
        <EmailGuide />
      </Suspense>

      <Sponsor />
    </div>
  )
}
