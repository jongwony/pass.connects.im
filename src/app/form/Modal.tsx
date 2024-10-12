"use client"
import React from 'react';
import { useState } from 'react';
import Crop from "./CroppieUpload"
import styles from "./modal.module.css";


const Modal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button onClick={openModal}>이미지 추가</button>
      {modalOpen && (
        <div className={styles.main}>
          <div className={styles.content}>
            <button className="absolute top-2 right-6 text-gray-600 hover:text-gray-800" onClick={closeModal}>
              &times;
            </button>
            <Crop />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;