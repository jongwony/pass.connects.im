"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const Hero: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('hero');

  const states = [
    { textKey: 'toss', image: '/hero_toss.png' },
    { textKey: 'linkedin', image: '/hero_linkedin.png' },
    { textKey: 'kakao', image: '/hero_kakao.png' },
    { textKey: 'instagram', image: '/hero_instagram.png' },
  ];

  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentStateIndex((prevIndex) => (prevIndex + 1) % states.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [states.length]);

  const { textKey, image } = states[currentStateIndex];

  return (
    <main className="relative flex flex-col align-center mt-16">
      <header className="flex flex-col text-center">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          <span
            className={`inline-block transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
          >
            {t(`states.${textKey}`)}
          </span>
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          {t('subtitle')}
        </p>
      </header>

      <div className="flex justify-center items-center mt-4">
        <button
          type="button"
          onClick={() => router.push('/form')}
          className="px-4 py-2 text-white font-semibold bg-blue-500 rounded-md
                      hover:bg-opacity-80 transition-colors"
        >
          {t('cta')}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className='relative'>
          <Image
            alt="dynamic content"
            src={image.replace('.png', '_light.png')}
            width={546}
            height={773}
            priority={true}
            className="dark:hidden"
          />
          <Image
            alt="dynamic content"
            src={image}
            width={546}
            height={773}
            priority={true}
            className="hidden dark:block"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
