"use client";

import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Coffee } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');

  return (
    <footer className="p-4 m-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {pathname !== "/privacy" && (
          <a
            href="privacy"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {t('privacy')}
          </a>
        )}
        <a
          href="https://buymeacoffee.com/lastone9186/share/first-coffee"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-yellow-400 text-zinc-900 hover:bg-yellow-500 transition-colors"
        >
          <Coffee size={18} />
          Buy Me a Coffee
        </a>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
