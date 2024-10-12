
import React from 'react';
import Image from 'next/image'
import "./hero.css";

const Hero: React.FC = () => {
  return (
    <main className="hero-main">
      {/* Header */}
      <header className="hero-header">
        <h1 className="hero-h1">Pass Connect</h1>
        <p className="hero-p">지갑 앱에 명함을 담아 언제 어디서든 네트워킹을 시작하세요.</p>
      </header>
      <div className="hero-image">
        <Image alt="hand" src="/image.png" width={678} height={730} priority={true}/>
      </div>
    </main>
  );
};

export default Hero;