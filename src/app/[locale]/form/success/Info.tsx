"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Cancel from './Cancel';

const GetInfo: React.FC = () => {
  const t = useTranslations('success')
  const tCommon = useTranslations('common')
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [profileData, setProfileData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const issueCode = searchParams.get('issue_code') || 'No code provided'

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
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
        setError(t('fetchError'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [issueCode, t])

  if (isLoading) {
    return <div className="text-center p-4 text-zinc-600 dark:text-zinc-400 font-semibold italic">{t('loading')}</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  if (!profileData) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">
          {t('dataDeleted')}
        </h1>
        <p className="mt-2 text-center">
          {t('contactNote')}{' '}
          <a
            href="mailto:pass.connects.im@gmail.com"
            className="text-blue-600 font-medium hover:underline"
          >
            pass.connects.im@gmail.com
          </a>{' '}
          {t('contactSuffix')}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <h2 className="text-xl font-bold mt-4 text-center">{t('checkRequest')}</h2>
        <p className="font-semibold text-center mt-2">{t('issueCode')}: {issueCode}</p>
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
            !(profileData.issue_code.startsWith('tosspay')) && (
              <p className="text-lg font-bold text-center text-red-400 mb-4">
                {t('noImage')}
              </p>
            )
          )}

          {/* Iterate through key-values except code, email, thumbnail */}
          {Object.entries(profileData)
            .filter(([key]) => !['thumbnail', 'issue_code', 'type', 'timestamp'].includes(key))
            .map(([key, value]) => (
              <div key={key}>
                <p className="text-sm font-medium">{key}</p>
                <code className="text-sm text-gray-500 hover:underline">{String(value) || tCommon('empty')}</code>
              </div>
            ))}
        </div>
      </div>

      <Cancel />
    </>
  )
}

export default GetInfo;
