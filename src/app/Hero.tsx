import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero: React.FC = () => {
  const router = useRouter();
  const states = [
    { text: 'LinkedIn 프로필을', image: '/hero_linkedin.png' },
    { text: 'Instagram 프로필을', image: '/hero_instagram.png' },
    { text: '카카오페이로 송금하는 QR코드를', image: '/hero_kakao.png' },
    { text: '토스뱅크로 송금하는 QR코드를', image: '/hero_toss.png' },
  ];

  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentStateIndex((prevIndex) => (prevIndex + 1) % states.length);
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 3000); // Duration for each state

    return () => clearInterval(interval);
  }, []);

  const { text, image } = states[currentStateIndex];

  return (
    <main className="relative flex flex-col align-center mt-8">
      {/* Header */}
      <header className="flex flex-col text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Pass Connect</h1>
        <p className="text-gray-400 text-lg">
          <span
            className={`inline-block transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
          >
            {text}
          </span>
        </p>
        <p className="text-gray-400 text-lg">
          Apple Wallet 앱에 담으세요.
        </p>

      </header>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => router.push('/form')}
          className="px-4 py-2 text-white font-semibold bg-blue-500 rounded-md
                      hover:bg-blue-600 transition-colors"
        >
          만들기
        </button>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center">
        <div
          className='relative'
        >
          <Image alt="dynamic content" src={image} width={546} height={773} priority={true} />
        </div>
      </div>
    </main>
  );
};

export default Hero;