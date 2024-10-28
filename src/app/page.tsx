"use client"
import Hero from "./Hero";
import Curation from "./Curation";
import { Share, QrCode, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="flex flex-col sm:flex-row p-8 gap-8">
        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <Share width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">QR 코드로 오프라인에서도 내 정보를 손쉽게 공유하세요.</h1>
            <p className="text-gray-400 sm:text-xl">앱 설치 없이 블로그, 프로필, 링크를 QR 코드로 연결하세요.</p>
          </header>
        </div>

        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <QrCode width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">종이 명함 없이 QR로 내 프로필을 공유하세요.</h1>
            <p className="text-gray-400 sm:text-xl">QR로 링크를 전달해 팔로우를 유도해보세요.</p>
          </header>
        </div>

        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <Lightbulb width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">직함과 소개를 더해 나만의 명함을 만드세요.</h1>
            <p className="text-gray-400 sm:text-xl">원하는 문구로 개성 있는 디지털 명함을 완성하세요.</p>
          </header>
        </div>
      </div>

      <Curation />

      {/* <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">이메일로 패스를 보내드립니다</h1>
          <p className="text-gray-400 sm:text-xl">한 번 구매하면 영구히 소장됩니다.</p>
        </header>
      </div> */}

    </div>
  );
}
