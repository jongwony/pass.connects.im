import React, { useRef, useEffect } from 'react';
import Croppie from 'croppie';
import 'croppie/croppie.css';

interface CroppieComponentProps {
  imageUrl: string;
  onCrop: (croppedImage: string) => void;
}

const CroppieComponent: React.FC<CroppieComponentProps> = ({ imageUrl, onCrop }) => {
  const croppieRef = useRef<HTMLDivElement>(null);
  const croppieInstance = useRef<Croppie | null>(null);

  // Croppie 인스턴스 초기화 (한 번만 실행)
  useEffect(() => {
    if (croppieRef.current) {
      croppieInstance.current = new Croppie(croppieRef.current, {
        viewport: { width: 180, height: 180, type: 'square' },
        boundary: { width: 360, height: 360 },
        showZoomer: true,
      });
    }

    // 컴포넌트 언마운트 시 Croppie 인스턴스 정리
    return () => {
      if (croppieInstance.current) {
        croppieInstance.current.destroy();
        croppieInstance.current = null;
      }
    };
  }, []);

  // 이미지 URL이 변경될 때마다 이미지 바인딩
  useEffect(() => {
    if (croppieInstance.current && imageUrl) {
      croppieInstance.current.bind({
        url: imageUrl,
      });
    }
  }, [imageUrl]);

  const handleCrop = async () => {
    if (croppieInstance.current) {
      const result = await croppieInstance.current.result({
        type: 'base64',
        size: 'viewport',
      });
      onCrop(result);
    }
  };

  return (
    <div>
      <div ref={croppieRef}></div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCrop}>이미지 자르기</button>
    </div>
  );
};

export default CroppieComponent;