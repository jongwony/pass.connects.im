import { Suspense } from 'react';
import SuccessContent from './SuccessContent';
import Loading from './Loading';

type Props = {
  searchParams: Promise<{ issue_code?: string; utm_medium?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const issueCode = params.issue_code || '';
  const utmMedium = params.utm_medium || '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense fallback={<Loading />}>
        <SuccessContent issueCode={issueCode} utmMedium={utmMedium} />
      </Suspense>
    </div>
  );
}
