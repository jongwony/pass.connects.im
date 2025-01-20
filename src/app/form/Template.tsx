"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"


interface TemplateProps {
  templates: {id: string, name: string, src: string, dark: string, light: string}[];
  onThemeChange: (theme: string) => void;
  onTemplateChange: (template: string) => void;
}

export default function ChooseTemplate({ templates, onThemeChange, onTemplateChange }: TemplateProps) {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [direction, setDirection] = useState(1); // 방향 상태 유지

  useEffect(() => {
    onTemplateChange(templates[currentTemplate].id);
    onThemeChange(currentTheme);
  }, [currentTemplate]);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    onThemeChange(theme)
  }

  const handleNext = () => {
    setDirection(1); // 다음으로 이동 시 방향을 1로 설정
    setCurrentTemplate((prev) => {
      const newIndex = (prev + 1) % templates.length;
      onTemplateChange(templates[newIndex].id);
      return newIndex;
    })
  }

  const handlePrev = () => {
    setDirection(-1); // 이전으로 이동 시 방향을 -1로 설정
    setCurrentTemplate((prev) => {
      const newIndex = (prev - 1 + templates.length) % templates.length;
      onTemplateChange(templates[newIndex].id);
      return newIndex;
    })
  }

  const handleDragStart = (event: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX
    setDragStart(clientX)
  }

  const handleDragEnd = (event: React.TouchEvent | React.MouseEvent) => {
    const clientX = "changedTouches" in event ? event.changedTouches[0].clientX : event.clientX
    const diff = dragStart - clientX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  // Variants 정의
  const variants = {
    enter: (direction: number) => ({
      x: direction * 300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: -direction * 300,
      opacity: 0
    })
  };

  const themeStyles: Record<string, string> = {
    light: "bg-white border-blue-500 scale-110",
    dark: "bg-black border-blue-500 scale-110",
    insta_special: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-blue-500 border-blue-500 scale-110",
    kakaopay1: "bg-yellow-300 border-blue-500 scale-110",
  };

  const getThemeStyle = (theme: string) => {
    return themeStyles[theme] || "border-transparent"; // 기본값 처리
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="relative rounded-2xl bg-zinc-900">
        <h1 className="text-2xl font-bold m-2 text-center">원하는 카드를 골라주세요</h1>
        <p className="text-sm mb-6 text-gray-400 text-center">{templates[currentTemplate].name}</p>

        <div
          className="relative w-full flex justify-center items-center"
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentTemplate}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 1000, damping: 50 }}
              className="relative"
            >
              <Image
                src={templates[currentTemplate].src !== '' ? templates[currentTemplate].src : (currentTheme === 'dark' ? templates[currentTemplate].dark : templates[currentTemplate].light)}
                alt={templates[currentTemplate].name}
                className={`aspect-[1/2] object-cover transition-colors duration-100`}
                width={282}
                height={568}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
 
      <div className="flex justify-center items-center gap-4">
      {(templates[currentTemplate].src === '') ? (
        <>
          <button
            type="button"
            onClick={() => handleThemeChange("light")}
            className={`w-8 h-8 rounded-full border-2 bg-white transition-all ${currentTheme === "light" ? "border-blue-500 scale-110" : "border-transparent"
              }`}
            aria-label="Light theme"
          />
          <button
            type="button"
            onClick={() => handleThemeChange("dark")}
            className={`w-8 h-8 rounded-full border-2 bg-black transition-all ${currentTheme === "dark" ? "border-blue-500 scale-110" : "border-transparent"
              }`}
            aria-label="Dark theme"
          />
        </>
      ) : (
        <button
          type="button"
          className={`w-8 h-8 rounded-full border-2 bg-black transition-all ${getThemeStyle(templates[currentTemplate].id)}`}
          aria-label="Special theme"
        />
      )}
    </div>
  </div>
  )
}