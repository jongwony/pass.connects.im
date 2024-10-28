"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from "./curation.module.css";


const Curation: React.FC = () => {
  const router = useRouter();

  const navigateToPage = () => {
    router.push('https://smartstore.naver.com/passconnect/products/10965709607')
  };

  return (
    <div className="relative mt-8">
      {/* Header */}
      <header className="flex flex-col text-center p-8 gap-4 order-1">
        <h1 className="text-xl sm:text-2xl">원하는 템플릿을 눌러 보세요.</h1>
        <p className="text-gray-400 sm:text-xl">다양한 템플릿으로 나만의 스타일을 완성하세요.</p>
      </header>
      <div className={styles.template}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <Link
              href={{
                pathname: '/form/linkedin2',
              }}
            >
              <Image alt="Linkedin2Light" src="/Linkedin2Light.png" width={282} height={568} />
            </Link>
            <Link
              href={{
                pathname: '/form/insta_special',
              }}
            >
              <Image alt="InstaSpecial" src="/InstaSpecial.png" width={282} height={568} />
            </Link>
            <Link
              href={{
                pathname: '/form/linkedin1',
              }}
            >
              <Image alt="Linkedin1Dark" src="/Linkedin1Dark.png" width={282} height={568} />
            </Link>
            <Link
              href={{
                pathname: '/form/insta1',
              }}
            >
              <Image alt="Insta1Light" src="/Insta1Light.png" width={282} height={568} />
            </Link>
            {/* 480px 이하에서만 보일 복제된 이미지 */}
            <Link
              className={styles.clone}
              href={{
                pathname: '/form/linkedin2',
              }}
            >
              <Image alt="Linkedin2Light" src="/Linkedin2Light.png" width={282} height={568} />
            </Link>
            <Link
              className={styles.clone}
              href={{
                pathname: '/form/insta_special',
              }}
            >
              <Image alt="InstaSpecial" src="/InstaSpecial.png" width={282} height={568} />
            </Link>
            <Link
              className={styles.clone}
              href={{
                pathname: '/form/linkedin1',
              }}
            >
              <Image alt="Linkedin1Dark" src="/Linkedin1Dark.png" width={282} height={568} />
            </Link>
            <Link
              className={styles.clone}
              href={{
                pathname: '/form/insta1',
              }}
            >
              <Image alt="Insta1Light" src="/Insta1Light.png" width={282} height={568} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curation;