import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ThemeSelectorProps {
  initialTheme?: string
  onThemeChange?: (theme: 'light' | 'dark') => void
}

export default function Component({ initialTheme = undefined, onThemeChange = () => {} }: ThemeSelectorProps) {
  const [theme, setTheme] = useState<string | undefined>(initialTheme);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    onThemeChange(newTheme)
  }, [onThemeChange])

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">LinkedIn 카드 테마를 골라주세요.</h1>

      <div className="flex flex-row space-x-4 space-y-0 justify-center mb-6">
        <div
          className={`relative cursor-pointer ${theme === 'light'
              ? 'ring-2 ring-blue-500 ring-offset-2'
              : 'hover:opacity-80'
            }`}
          onClick={() => handleThemeChange('light')}
        >
          <Image alt="Linkedin1Light" src="/Linkedin2Light.png" width={141} height={284} />
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={() => handleThemeChange('light')}
            className="sr-only"
            aria-label="Light theme"
          />
          {theme === 'light' && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div
          className={`relative cursor-pointer ${theme === 'dark'
              ? 'ring-2 ring-blue-500 ring-offset-2'
              : 'hover:opacity-80'
            }`}
          onClick={() => handleThemeChange('dark')}
        >
          <Image alt="Linkedin1Dark" src="/Linkedin2Dark.png" width={141} height={284} />
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => handleThemeChange('dark')}
            className="sr-only"
            aria-label="Dark theme"
          />
          {theme === 'dark' && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex items-center justify-center space-x-4">
        <span className="text-sm font-medium">선택된 테마:</span>
        <span className="font-bold">{theme === 'light' ? 'Light' : 'Dark'}</span>
      </div> */}
    </div>
  )
}