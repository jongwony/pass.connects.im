"use client"

import React, { useState, useLayoutEffect, useRef } from 'react'
import Image from "next/image"


interface TemplateProps {
  templates: { id: string, name: string, src: string, dark: string, light: string }[];
  onThemeChange: (theme: string) => void;
  onTemplateChange: (template: string) => void;
}

export default function ChooseTemplate({ templates, onThemeChange, onTemplateChange }: TemplateProps) {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    onTemplateChange(templates[currentTemplate].id);
    onThemeChange(currentTheme);
  }, [currentTemplate, currentTheme]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const child = scrollContainerRef.current.children[0] as HTMLElement
      if (!child) return;
      const childStyle = getComputedStyle(child)
      const childWidth = child.offsetWidth + parseInt(childStyle.marginRight)
      // const templateWidth = scrollContainerRef.current.clientWidth;

      const newCurrentTemplate = Math.round(scrollLeft / childWidth);
      setCurrentTemplate(newCurrentTemplate);
      setCurrentTheme(templates[newCurrentTemplate].id)
      onTemplateChange(templates[newCurrentTemplate].id)
    }
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    onThemeChange(theme)
  }

  const themeStyles: Record<string, string> = {
    light: "bg-white border-blue-500 scale-110",
    dark: "bg-black border-blue-500 scale-110",
    insta_special: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-blue-500 border-blue-500 scale-110",
    kakaopay1: "bg-yellow-300 border-blue-500 scale-110",
    tosspay1: "bg-black border-blue-500 scale-110",
  };

  const getThemeStyle = (theme: string) => {
    return themeStyles[theme] || "border-transparent"; // 기본값 처리
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="relative rounded-2xl">
        <h1 className="text-2xl font-bold m-2 text-center">원하는 카드를 골라주세요</h1>
        <p className="text-sm mb-6 text-zinc-600 dark:text-zinc-400 text-center">{templates[currentTemplate].name}</p>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative w-full overflow-x-auto snap-x snap-mandatory flex space-x-4"
        >
          {templates.map((template) => (
            <div key={template.id} className="flex-none snap-center">
              <Image
                src={
                  template.src !== ''
                    ? template.src
                    : currentTheme === 'dark'
                      ? template.dark
                      : template.light
                }
                alt={template.name}
                className="w-[282px] h-[568px] object-cover transition-colors duration-100"
                width={282}
                height={568}
              />
            </div>
          ))}
        </div>
        {/* 왼쪽 fade-out 오버레이 */}
        <div className="absolute top-0 left-0 h-full w-8 pointer-events-none bg-gradient-to-r from-white to-transparent dark:from-black"></div>
        {/* 오른쪽 fade-out 오버레이 */}
        <div className="absolute top-0 right-0 h-full w-8 pointer-events-none bg-gradient-to-l from-white to-transparent dark:from-black"></div>
      </div>

      <div className="flex justify-center items-center gap-4">
        {(templates[currentTemplate].src === '') ? (
          <>
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className={`w-8 h-8 rounded-full border-2 bg-white transition-all ${currentTheme === "light" ? "border-blue-500 scale-110" : "border-gray-200 dark:border-gray-800"
                }`}
              aria-label="Light theme"
            />
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className={`w-8 h-8 rounded-full border-2 bg-black transition-all ${currentTheme === "dark" ? "border-blue-500 scale-110" : "border-gray-200 dark:border-gray-800"
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