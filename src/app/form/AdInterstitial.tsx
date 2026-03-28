"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdInterstitialProps {
  onConfirm: () => void;
  onClose: () => void;
}

const COUNTDOWN_SECONDS = 5;

export default function AdInterstitial({ onConfirm, onClose }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            type="button"
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              잠깐, 떠나기 전에!
            </p>

            <div className="border border-zinc-300 dark:border-zinc-700 p-6 rounded-lg">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                이 프로젝트는 아래와 같은 문제 인식에서 출발했어요.
              </p>
              <blockquote className="italic font-semibold my-3 text-zinc-800 dark:text-zinc-200 text-sm">
                내 프로필 페이지를 소개하는데 <br />
                모두가 내 아이디를 검색하는 일이 번거롭다.
              </blockquote>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                서비스 운영 비용과 Apple Developer Program 연회비(99달러)를 부담하고 있어요.
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm">
                따뜻한 응원을 보내주시면 정말 감사하겠습니다.
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <a
                  href="https://buymeacoffee.com/lastone9186/share/first-coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm rounded-md bg-yellow-400 text-zinc-900 font-medium hover:bg-yellow-300 transition-colors"
                >
                  Buy Me a Coffee
                </a>
              </div>
            </div>

            <button
              onClick={onConfirm}
              disabled={countdown > 0}
              className="w-full py-3 rounded-md text-white font-medium transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600"
              type="button"
            >
              {countdown > 0 ? `계속하기 (${countdown}초)` : '계속하기'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
