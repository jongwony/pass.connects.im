"use client"
import Hero from "./Hero";
import Curation from "./Curation";

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">오프라인에서 지갑에 있는 QR 코드를 공유하세요</h1>
          <p className="text-gray-400 sm:text-xl">나만의 블로그, 프로필 링크, 홈페이지를 QR 코드로 저장해 보세요.</p>
        </header>
      </div>

      <Curation />

      <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">앱을 설치할 필요가 없어요!</h1>
          <p className="text-gray-400 sm:text-xl">나만의 블로그, 프로필 링크, 홈페이지를 QR 코드로 저장해 보세요.</p>
        </header>
      </div>

      <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">이메일로 패스를 보내드립니다</h1>
          <p className="text-gray-400 sm:text-xl">한 번 구매하면 영구히 소장됩니다.</p>
        </header>
      </div>

      <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">종이 명함을 휴대할 필요가 없습니다</h1>
          <p className="text-gray-400 sm:text-xl">QR로 간편하게 내 프로필 링크로 팔로우를 유도하세요</p>
        </header>
      </div>

      <div className="relative mt-8">
        <header className="flex flex-col text-center p-8 gap-4 order-1">
          <h1 className="text-xl sm:text-2xl">원하는 문구를 추가할 수 있습니다</h1>
          <p className="text-gray-400 sm:text-xl">패스에 직함과 소개를 추가해 멋진 디지털 명함을 만들어 보세요</p>
        </header>
      </div>
    </div>
  );
}
