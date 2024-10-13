import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CropIcon, ZoomIn, RotateCw, Camera } from 'lucide-react'
import Cropper, { Point, Area } from 'react-easy-crop'
import { useImageContext } from './ImageContext'

export default function ProfilePictureUpload() {
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const { setCroppedImage } = useImageContext()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
    })

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0
  ): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return ''
    }

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    canvas.width = safeArea
    canvas.height = safeArea

    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-safeArea / 2, -safeArea / 2)

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    )

    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    )

    return canvas.toDataURL('image/jpeg')
  }

  const handleCrop = useCallback(async () => {
    if (croppedAreaPixels && image) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
        setCroppedImage(croppedImage)
        setImage(null) // 원본 이미지 제거
        setIsOpen(false) // 모달 닫기
      } catch (e) {
        console.error(e)
      }
    }
  }, [croppedAreaPixels, image, rotation, setCroppedImage])

  return (
    <div className="space-y-2">
      <label htmlFor="primaryField" className="m-2 text-sm font-medium">사진</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-600 rounded-md transition-colors"
      >
        <Camera />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-96 overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">프로필 사진 업로드</h2>
              </div>

              <div className="p-6">
                {!image ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">클릭하거나 이미지를 여기에 드래그하세요</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-lg">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        rotation={rotation}
                        cropShape="round"
                        showGrid={false}
                      />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <ZoomIn size={20} />
                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-24"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RotateCw size={20} />
                        <input
                          type="range"
                          value={rotation}
                          min={0}
                          max={360}
                          step={1}
                          aria-labelledby="Rotation"
                          onChange={(e) => setRotation(Number(e.target.value))}
                          className="w-24"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleCrop}
                        className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        <CropIcon size={20} className="mr-2" />
                        이미지 자르기
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end p-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setImage(null)
                    setCrop({ x: 0, y: 0 })
                    setZoom(1)
                    setRotation(0)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
