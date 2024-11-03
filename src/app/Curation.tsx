"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from "./curation.module.css";

const templates = [
  { id: 'linkedin2', src: '/Linkedin2Light.png', alt: 'Linkedin2Light' },
  { id: 'insta_special', src: '/InstaSpecial.png', alt: 'InstaSpecial' },
  { id: 'linkedin1', src: '/Linkedin1Dark.png', alt: 'Linkedin1Dark' },
  { id: 'insta1', src: '/Insta1Light.png', alt: 'Insta1Light' },
];

export default function Curation() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageInteraction = (id: string) => {
    if (isMobile) {
      setSelectedTemplate(prevSelected => prevSelected === id ? null : id);
    }
  };

  return (
    <div className="relative mt-8">
      <header className="flex flex-col text-center p-8 gap-4 order-1">
        <h1 className="font-semibold text-xl sm:text-2xl">원하는 템플릿을 선택해 나만의 디지털 명함을 만들어보세요.</h1>
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

      <div className={styles.template}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            {templates.map((template) => (
              <div
                key={template.id}
                className="relative group"
                onMouseEnter={() => !isMobile && setSelectedTemplate(template.id)}
                onMouseLeave={() => !isMobile && setSelectedTemplate(null)}
                onClick={() => handleImageInteraction(template.id)}
              >
                <Image
                  alt={template.alt}
                  src={template.src}
                  width={282}
                  height={568}
                  priority={true}
                />
              </div>
            ))}

            {/* 480px 이하에서만 보일 복제된 이미지 */}
            {templates.map((template) => (
              <div
                key={`clone-${template.id}`}
                className={`${styles.clone} relative group`}
                onClick={() => handleImageInteraction(template.id)}
              >
                <Image
                  alt={template.alt}
                  src={template.src}
                  width={282}
                  height={568}
                  priority={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
