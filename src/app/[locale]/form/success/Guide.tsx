"use client"
import { useTranslations } from 'next-intl'

type Props = {
  utmMedium: string;
};

const EmailGuide: React.FC<Props> = ({ utmMedium }) => {
  const t = useTranslations('success.emailGuide')

  // Don't show guide if user came from email
  if (utmMedium === 'email') {
    return null;
  }

  return (
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
  )
}

export default EmailGuide;
