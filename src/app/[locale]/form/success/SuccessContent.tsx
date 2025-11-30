'use client'
import GetInfo from './Info';
import EmailGuide from './Guide';
import Cancel from './Cancel';
import Sponsor from '@/app/[locale]/Sponsor';

type Props = {
  issueCode: string;
  utmMedium: string;
};

export default function SuccessContent({ issueCode, utmMedium }: Props) {
  return (
    <>
      <GetInfo issueCode={issueCode} />
      <EmailGuide utmMedium={utmMedium} />
      <Cancel issueCode={issueCode} />
      <Sponsor />
    </>
  );
}
