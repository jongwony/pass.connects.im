
import React from 'react';
import Image from 'next/image'

const Hero: React.FC = () => {
  return (
    <main className="relative flex flex-col align-center mt-8">
      {/* Header */}
      <header className="flex flex-col text-center p-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Pass Connect</h1>
        <p className="text-gray-400 sm:text-xl">나만의 디지털 명함을 iOS 지갑에 담으세요.</p>
      </header>
      <div className='flex flex-col items-center'>
        <Image alt="hand" src="/image.png" width={678} height={730} priority={true}/>
      </div>
    </main>
  );
};

export default Hero;