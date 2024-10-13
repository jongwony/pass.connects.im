"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from "./curation.module.css";


const Curation: React.FC = () => {
  const router = useRouter();

  const navigateToPage = () => {
    // router.push('/form');
    router.push('https://smartstore.naver.com/passconnect/products/10965709607')
  };

  return (
    <div className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <p>다양한 템플릿으로 나만의 스타일을 완성하세요.</p>
      </header>
      <button className={styles.button} onClick={navigateToPage}>만들기</button>
      <div className={styles.template}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <a href="#">
              <Image alt="sample1" src="/image1.png" width={282} height={568} />
            </a>
            <a href="#">
              <Image alt="sample2" src="/image2.png" width={282} height={568} />
            </a>
            <a href="#">
              <Image alt="sample3" src="/image3.png" width={282} height={568} />
            </a>
            <a href="#">
              <Image alt="sample4" src="/image4.png" width={282} height={568} />
            </a>
            {/* 480px 이하에서만 보일 복제된 이미지 */}
            <a href="#" className={styles.clone}>
              <Image alt="sample1" src="/image1.png" width={282} height={568} />
            </a>
            <a href="#" className={styles.clone}>
              <Image alt="sample2" src="/image2.png" width={282} height={568} />
            </a>
            <a href="#" className={styles.clone}>
              <Image alt="sample3" src="/image3.png" width={282} height={568} />
            </a>
            <a href="#" className={styles.clone}>
              <Image alt="sample4" src="/image4.png" width={282} height={568} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curation;