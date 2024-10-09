
import React from 'react';
import "./hero.css";

const Hero: React.FC = () => {
  return (
    <div className="hero-main">
      {/* Header */}
      <header className="hero-header">
        <h1 className="hero-h1">Pass Connect</h1>
        <p className="hero-p">지갑 앱에 명함을 담아 언제 어디서든 네트워킹을 시작하세요.</p>
      </header>
      <div className="hero-image"></div>
    </div>
  );
};

export default Hero;