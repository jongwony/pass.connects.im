"use client";
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function Sponsor() {
    const t = useTranslations('sponsor');
    const tCommon = useTranslations('common');
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = useCallback(() => {
        if (!isMobile()) {
            setShowPopup(true);
        }
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className="m-8 border border-gray-400 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <p className="text-zinc-600 dark:text-zinc-400">
                    {t('intro')}
                </p>
                <blockquote className="italic font-semibold m-4">
                    {t('quote')}
                </blockquote>
                <p className="text-zinc-600 dark:text-zinc-400">
                    {t('cost')}
                </p>
                <p className="m-4 text-zinc-600 dark:text-zinc-400">
                    {t('appeal')}
                </p>
                <button
                    className="w-full my-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    type="submit"
                    onClick={() => {
                        if (isMobile()) {
                            window.location.href = 'supertoss://send?amount=2000&bank=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC&accountNo=100007643029&origin=qr';
                        } else {
                            handleShowPopup();
                        }
                    }}
                >
                    {t('donateButton')}
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-zinc-400 dark:bg-zinc-800 p-6 rounded-lg shadow-lg text-center justify-center">
                        <h2 className="text-xl font-bold mb-4">{t('qrTitle')}</h2>
                        <p className="">{t('qrDesc')}</p>
                        <Image className="m-4 mx-auto" src="/supertoss.png" alt="Toss QR Code" width={100} height={100} />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-opacity-80 transition-colors"
                            onClick={handleClosePopup}
                        >
                            {tCommon('close')}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
