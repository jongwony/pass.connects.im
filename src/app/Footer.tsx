"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="p-4 m-8">
      {pathname !== "/privacy" && (
        <p className="font-semibold text-center text-zinc-600 dark:text-zinc-400">
          <a href="/privacy">개인정보 처리방침</a>
        </p>
      )}
    </footer>
  );
}