"use client"
import Hero from "./Hero";
import Curation from "./Curation";
import { QrCode, Scan, IdCard } from "lucide-react";
import GTM from "./GTM";

export default function Home() {
  return (
    <div>
      <GTM />

      <Hero />

      <div className="flex flex-col sm:flex-row item-center align-center justify-center p-8 gap-8">
        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <QrCode width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">QR로 나를 소개하고 자연스럽게 연결하세요.</h1>
            <p className="text-gray-400 sm:text-xl">블로그, SNS, 포트폴리오 등 원하는 곳으로 쉽게 안내하세요.</p>
          </header>
        </div>

        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <Scan width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">근처 사람들과 내 프로필을 공유해보세요.</h1>
            <p className="text-gray-400 sm:text-xl">이벤트 현장에서 명함 없이 네트워킹을 즐기세요.</p>
          </header>
        </div>

        <div className="relative mt-8 border border-gray-600 rounded-3xl">
          <header className="flex flex-col p-8 gap-4">
            <IdCard width={32} height={32} />
            <h1 className="font-semibold text-xl sm:text-2xl">직함과 소개로 개성 있는 명함을 만들어보세요.</h1>
            <p className="text-gray-400 sm:text-xl">원하는 문구를 추가해 나만의 디지털 명함을 완성하세요.</p>
          </header>
        </div>
      </div>

      <Curation />

    </div>
  );
}
