"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'
// import { useRouter } from 'next/navigation';

import styles from "./curation.module.css";


const Curation: React.FC = () => {
  // const router = useRouter();

  // const navigateToPage = () => {
  //   router.push('https://smartstore.naver.com/passconnect/products/10965709607')
  // };

  return (
    <div className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <p>다양한 템플릿으로 나만의 스타일을 완성하세요.</p>
      </header>
      {/* <button className={styles.button} onClick={navigateToPage}>만들기</button> */}
      <div className={styles.template}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <Suspense>
              <Link
                href={{
                  pathname: '/form/linkedin2',
                  query: {
                    name: 'Sanghyo Yee',
                    role: 'Product Designer',
                    company: 'Lottefiles',
                    code: 'https://www.linkedin.com/in/sanghyo-yee/',
                    theme: 'light',
                  },
                }}
              >
                <Image alt="Linkedin2Light" src="/Linkedin2Light.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                href={{
                  pathname: '/form/insta_special',
                  query: {
                    name: 'jongwony_',
                    id: '최종원',
                    bio: '🧑‍💻 🎸🍳🍾',
                    code: 'https://www.instagram.com/jongwony_/',
                  },
                }}
              >
                <Image alt="InstaSpecial" src="/InstaSpecial.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                href={{
                  pathname: '/form/linkedin1',
                  query: {
                    name: 'Jongwon Choi',
                    role: 'Data Engineering Manager',
                    company: 'Wantedlab',
                    joinDate: 'June 2018 - Present',
                    code: 'https://www.linkedin.com/in/jongwon-choi-366b5b111/',
                    theme: 'dark',
                  },
                }}
              >
                <Image alt="Linkedin1Dark" src="/Linkedin1Dark.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                href={{
                  pathname: '/form/insta1',
                  query: {
                    name: 'jongwony_',
                    id: '최종원',
                    bio: '🧑‍💻 🎸🍳🍾',
                    code: 'https://www.instagram.com/jongwony_/',
                    theme: 'light',
                  },
                }}
              >
                <Image alt="Insta1Light" src="/Insta1Light.png" width={282} height={568} />
              </Link>
            </Suspense>

            {/* 480px 이하에서만 보일 복제된 이미지 */}
            <Suspense>
              <Link
                className={styles.clone}
                href={{
                  pathname: '/form/linkedin2',
                  query: {
                    name: 'Sanghyo Yee',
                    role: 'Product Designer',
                    company: 'Lottefiles',
                    code: 'https://www.linkedin.com/in/sanghyo-yee/',
                    theme: 'light',
                  },
                }}
              >
                <Image alt="Linkedin2Light" src="/Linkedin2Light.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                className={styles.clone}
                href={{
                  pathname: '/form/insta_special',
                  query: {
                    name: 'jongwony_',
                    id: '최종원',
                    bio: '🧑‍💻 🎸🍳🍾',
                    code: 'https://www.instagram.com/jongwony_/',
                  },
                }}
              >
                <Image alt="InstaSpecial" src="/InstaSpecial.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                className={styles.clone}
                href={{
                  pathname: '/form/linkedin1',
                  query: {
                    name: 'Jongwon Choi',
                    role: 'Data Engineering Manager',
                    company: 'Wantedlab',
                    code: 'https://www.linkedin.com/in/jongwon-choi-366b5b111/',
                    theme: 'dark',
                  },
                }}
              >
                <Image alt="Linkedin1Dark" src="/Linkedin1Dark.png" width={282} height={568} />
              </Link>
            </Suspense>

            <Suspense>
              <Link
                className={styles.clone}
                href={{
                  pathname: '/form/insta1',
                  query: {
                    name: 'jongwony_',
                    id: '최종원',
                    bio: '🧑‍💻 🎸🍳🍾',
                    code: 'https://www.instagram.com/jongwony_/',
                    theme: 'light',
                  },
                }}
              >
                <Image alt="Insta1Light" src="/Insta1Light.png" width={282} height={568} />
              </Link>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curation;