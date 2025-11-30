"use client"
import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CropIcon, ZoomIn, RotateCw } from 'lucide-react'
import Cropper, { Point, Area } from 'react-easy-crop'
import { useImageContext } from './ImageContext'
import { useTranslations } from 'next-intl'

export default function ProfilePictureUpload() {
  const t = useTranslations('profile')
  const tCommon = useTranslations('common')
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
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/heic',
        'image/heif',
        'image/webp',
      ]
      if (!validImageTypes.includes(file.type)) {
        alert('Unsupported image format')
        return
      }
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setImage(result)
        }
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
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

    const { width, height, x, y } = pixelCrop

    canvas.width = width
    canvas.height = height

    ctx.translate(width / 2, height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-width / 2, -height / 2)

    ctx.beginPath()
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(
      image,
      x, y, width, height,
      0, 0, width, height
    )

    const resizedCanvas = document.createElement('canvas')
    resizedCanvas.width = 180
    resizedCanvas.height = 180
    const resizedCtx = resizedCanvas.getContext('2d')

    if (resizedCtx) {
      resizedCtx.imageSmoothingEnabled = true
      resizedCtx.imageSmoothingQuality = 'high'

      resizedCtx.drawImage(
        canvas,
        0, 0, width, height,
        0, 0, resizedCanvas.width, resizedCanvas.height
      )
    }

    return resizedCanvas.toDataURL('image/png')
  }

  const handleCrop = useCallback(async () => {
    if (croppedAreaPixels && image) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
        setCroppedImage(croppedImage)
        setImage(null)
        setIsOpen(false)
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, [croppedAreaPixels, image, rotation, setCroppedImage])

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex px-4 py-2 space-x-2 text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-opacity-80 rounded-md transition-colors"
      >
        <Upload />
        <label htmlFor="upload">{t('upload')}</label>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-200 dark:bg-zinc-800 rounded-lg w-96 overflow-hidden"
            >
              <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold">{t('upload')}</h2>
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
                    <p className="text-zinc-600 dark:text-zinc-400">Click or drag image here</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
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
                        className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-opacity-80 transition-colors"
                      >
                        <CropIcon size={20} className="mr-2" />
                        {t('cropTitle')}
                      </button>
                    </div>
                  </div>
                )}
                <small>HEIC, HEIF formats may only work in Safari browser.</small>
              </div>

              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setImage(null)
                    setCrop({ x: 0, y: 0 })
                    setZoom(1)
                    setRotation(0)
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-80 transition-colors "
                >
                  {tCommon('close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
