
import React from 'react';
import Image from 'next/image'
import styles from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Pass Connect</h1>
        <p className={styles.subtitle}>지갑 앱에 명함을 담아 언제 어디서든 네트워킹을 시작하세요.</p>
      </header>
      <div>
        <Image alt="hand" src="/image.png" width={678} height={730} priority={true}/>
      </div>
    </main>
  );
};

export default Hero;