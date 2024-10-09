import React from 'react';
import "./curation.css";

const Portfolio: React.FC = () => {
  return (
    <div className="curation-main">
      {/* Header */}
      <header className="curation-header">
        <p>다양한 템플릿으로 나만의 스타일을 완성하세요.</p>
      </header>
      <button className="curation-button">만들기</button>
      <div className="curation-template">
        {/* Social Icons */}
        <a className="curation-image1" href="#"></a>
        <a className="curation-image2" href="#"></a>
        <a className="curation-image3" href="#"></a>
        <a className="curation-image4" href="#"></a>
      </div>
    </div>
  );
};

export default Portfolio;