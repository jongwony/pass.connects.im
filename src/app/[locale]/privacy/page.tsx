"use client";
import { useState } from "react";
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations('privacy');
  const tCommon = useTranslations('common');

  const privacyPolicy = [
    {
      title: t('sections.collection.title'),
      content: t('sections.collection.content'),
    },
    {
      title: t('sections.retention.title'),
      content: t('sections.retention.content'),
    },
    {
      title: t('sections.sharing.title'),
      content: t('sections.sharing.content'),
    },
    {
      title: t('sections.security.title'),
      content: t('sections.security.content'),
    },
    {
      title: t('sections.rights.title'),
      content: t('sections.rights.content'),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold m-12 text-center">{t('title')}</h1>
      {privacyPolicy.map((item, index) => (
        <div key={index} className="mb-8 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
          <button
            className="flex justify-between items-center w-full p-4 rounded-t-lg focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            {openIndex === index ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{item.content}</p>
            </div>
          )}
        </div>
      ))}
      <div className="m-12 flex justify-center">
        <button onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition">
          {tCommon('back')}
        </button>
      </div>
    </div>
  );
}
