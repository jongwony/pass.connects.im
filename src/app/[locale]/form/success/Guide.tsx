"use client"
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const EmailGuide: React.FC = () => {
  const t = useTranslations('success.emailGuide')
  const searchParams = useSearchParams();
  const from = searchParams.get('utm_medium') || 'No source provided';

  return (
    <>
      {from !== 'email' ? (
      <>
        <div className="p-8 w-full text-center">
          <h2 className="text-xl font-bold m-4">
            {t('title')}
          </h2>
          <p>{t('checkMobile')}</p>
          <p>{t('tapAttachment')}</p>
        </div>

        <div className="p-8 w-full max-w-md">
          <video className="w-full rounded-md" autoPlay loop muted>
            <source src="/add_pass.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-8 w-full max-w-md">
          <h2 className="text-xl font-bold m-4 text-center">{t('howToAdd')}</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t('step1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('step2') }} />
            <li dangerouslySetInnerHTML={{ __html: t('step3') }} />
          </ol>
        </div>
      </>
      ) : (
      <></>
      )}
    </>
  )
}

export default EmailGuide;
