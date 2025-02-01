import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Cancel from './Cancel';

const GetInfo: React.FC = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [profileData, setProfileData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const issueCode = searchParams.get('issue_code') || 'No code provided'

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 실제 API 호출을 여기에 구현하세요
        const response = await fetch(
          `https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/pass_connect/${issueCode}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch profile data')
        }
        const data = await response.json()
        console.log(data)
        setProfileData(data)
      } catch (error) {
        console.error('Error:', error);
        setError('프로필 데이터를 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [issueCode])

  if (isLoading) {
    return <div className="text-center p-4 text-gray-500 font-semibold italic">로딩 중...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  if (!profileData) {
    return <div className="text-center p-4 text-gray-500 font-semibold italic">프로필 데이터가 없습니다.</div>
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">요청한 내용을 확인해 보세요</h2>
        <p className="text-gray-500 font-semibold text-center">발급 코드: {issueCode}</p>
      </div>

      <div className="border rounded-lg border-gray-400 p-8 w-full max-w-md">
        <div className="space-y-2 overflow-hidden">
          {profileData.thumbnail ? (
            <div className="flex justify-center">
              <Image
                src={profileData.thumbnail}
                alt="Profile Thumbnail"
                width={90}
                height={90}
              />
            </div>
          ) : (
            <p className="text-lg font-bold text-center text-red-400 mb-4">이미지가 첨부되지 않았어요!</p>
          )}

          <div>
            <p className="text-sm font-medium">이메일</p>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium">QR Code</p>
            <a href={profileData.code} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
              <span className="truncate">{profileData.code}</span>
            </a>
          </div>

          {/* code, email, thumbnail 키를 제외한 나머지 키-값을 순회 */}
          {Object.entries(profileData)
            .filter(([key]) => !['code', 'email', 'thumbnail', 'issue_code', 'type', 'timestamp'].includes(key))
            .map(([key, value]) => (
              <div key={key}>
                <p className="text-sm font-medium">{key}</p>
                <code className="text-sm text-gray-500">{String(value) || "<비어 있음>"}</code>
              </div>
            ))}
        </div>
      </div>

      <Cancel />
    </>
  )
}

export default GetInfo;
