"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

const privacyPolicy = [
  {
    title: "1. 수집하는 개인정보 항목 및 수집 목적",
    content: `QR 코드 생성 및 이메일 전송을 위해 최소한의 개인정보만 수집합니다.
    수집된 정보를 추가로 저장하거나 활용하지 않습니다.`,
  },
  {
    title: "2. 개인정보의 보관 및 삭제 정책",
    content: `계좌번호와 이메일 주소를 포함한 수집된 모든 데이터는 대기열에 등록된 후 이메일로 전송되며, 이메일이 전송되는 즉시 삭제됩니다.
    삭제된 정보는 복구되지 않으며, 서버에 저장되지 않습니다.`,
  },
  {
    title: "3. 개인정보의 제3자 제공 및 위탁 처리",
    content: `서비스를 이용하는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 법적 요청이 있는 경우 예외적으로 제공될 수 있습니다.`,
  },
  {
    title: "4. 개인정보 보호 및 보안 조치",
    content: `서버로 전송하는 모든 데이터 전송 과정에서 암호화를 적용합니다.
    관리자 외 대기열에 있는 개인정보에 접근할 수 없습니다.`,
  },
  {
    title: "5. 사용자의 권리 및 개인정보 보호 문의",
    content: `사용자는 개인정보 삭제 요청 및 처리 내역 확인이 가능합니다.
    문의 이메일: pass.connects.im@gmail.com`,
  },
];

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold m-12 text-center">개인정보 처리방침</h1>
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
        <button onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          돌아가기
        </button>
      </div>
    </div>
  );
}