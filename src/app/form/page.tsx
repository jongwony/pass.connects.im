"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FormRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/form/basic');
  }, [router]);

  return null;
}
