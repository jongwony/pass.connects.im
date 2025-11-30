import React, { createContext, useState, useContext } from 'react'

type ImageContextType = {
  croppedImage: string | null
  setCroppedImage: (image: string | null) => void
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  return (
    <ImageContext.Provider value={{ croppedImage, setCroppedImage }}>
      {children}
    </ImageContext.Provider>
  )
}


export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider')
  }
  return context
}
