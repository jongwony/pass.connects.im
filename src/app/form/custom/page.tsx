"use client";
import { useRouter } from 'next/navigation';

export default function CustomFormPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
            준비 중
          </div>
          <h1 className="text-2xl font-bold">커스텀 디자인</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            나만의 카드를 직접 디자인하는 기능을 준비하고 있어요.
            <br />
            색상, 레이아웃, 요소 배치를 자유롭게 할 수 있게 됩니다.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
