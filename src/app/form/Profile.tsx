import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CropIcon, ZoomIn, RotateCw } from 'lucide-react'
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
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/heic',
        'image/heif',
        'image/webp',
      ]
      if (!validImageTypes.includes(file.type)) {
        alert('지원하지 않는 이미지 형식입니다.')
        return
      }
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setImage(result)
        }
      }
      reader.onerror = (error) => {
        console.error('파일을 읽는 중 오류가 발생했습니다:', error)
      }
      reader.readAsDataURL(file)
    } else {
      console.log('선택된 파일이 없습니다')
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

    // 캔버스 크기를 크롭할 영역으로 설정
    canvas.width = width
    canvas.height = height

    // 캔버스 중심으로 이동
    ctx.translate(width / 2, height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-width / 2, -height / 2)

    // 원형 클리핑 경로 설정
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()

    // 이미지를 캔버스에 그림
    ctx.drawImage(
      image,
      x, y, width, height,
      0, 0, width, height
    )

    // 캔버스를 180 x 180 px로 리사이즈
    const resizedCanvas = document.createElement('canvas')
    resizedCanvas.width = 180
    resizedCanvas.height = 180
    const resizedCtx = resizedCanvas.getContext('2d')

    if (resizedCtx) {
      // 이미지 스무딩을 위한 설정
      resizedCtx.imageSmoothingEnabled = true
      resizedCtx.imageSmoothingQuality = 'high'

      // 원본 캔버스의 내용을 리사이즈된 캔버스에 그림
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
        setImage(null) // 원본 이미지 제거
        setIsOpen(false) // 모달 닫기
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, [croppedAreaPixels, image, rotation, setCroppedImage])

  return (
    <div className="flex justify-center text-gray-400">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex px-4 py-2 space-x-2 text-white bg-gray-800 hover:bg-gray-600 rounded-md transition-colors"
      >
        <Upload />
        <label htmlFor="upload">프로필 사진 업로드</label>
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
                        className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        <CropIcon size={20} className="mr-2" />
                        이미지 자르기
                      </button>
                    </div>
                  </div>
                )}
                <small>heic, heif 등 아이폰 전용 이미지는 Safari 브라우저에서만 보일 수 있습니다.</small>
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
