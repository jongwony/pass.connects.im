import React from 'react';
import Image from 'next/image';
import "./curation.css";

const Curation: React.FC = () => {
  return (
    <div className="curation-main">
      {/* Header */}
      <header className="curation-header">
        <p>다양한 템플릿으로 나만의 스타일을 완성하세요.</p>
      </header>
      <button className="curation-button">만들기</button>
      <div className="curation-template">
        <div className="curation-container">
          <div className="curation-inner-container">
            {/* Social Icons */}
            <a href="#">
              <Image alt="sample1" src="/image1.png" width={282} height={568}/>
            </a>
            <a href="#">
              <Image alt="sample2" src="/image2.png" width={282} height={568}/>
            </a>
            <a href="#">
              <Image alt="sample2" src="/image3.png" width={282} height={568}/>
            </a>
            <a href="#">
              <Image alt="sample2" src="/image4.png" width={282} height={568}/>
            </a>
            {/* 480px 이하에서만 보일 복제된 이미지 */}
            <a href="#" className="clone">
              <Image alt="sample1" src="/image1.png" width={282} height={568}/>
            </a>
            <a href="#" className="clone">
              <Image alt="sample2" src="/image2.png" width={282} height={568}/>
            </a>
            <a href="#" className="clone">
              <Image alt="sample3" src="/image3.png" width={282} height={568}/>
            </a>
            <a href="#" className="clone">
              <Image alt="sample4" src="/image4.png" width={282} height={568}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curation;