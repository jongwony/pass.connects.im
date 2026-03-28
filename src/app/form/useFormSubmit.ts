import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FormDataTypes } from './Types';
import { getEndpointForTemplate } from './templates';

export function useFormSubmit() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAd, setShowAd] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormDataTypes | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: FormDataTypes) => {
    e.preventDefault();
    setPendingFormData(formData);
    setShowAd(true);
  };

  const confirmSubmit = async () => {
    if (!pendingFormData) return;
    setShowAd(false);
    setIsSubmitting(true);
    setErrorMessage('');
    console.log('Form Submitted:', pendingFormData);

    try {
      const endpoint = getEndpointForTemplate(pendingFormData.template);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingFormData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      router.push(`/form/success?issue_code=${data.issue_code}`);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('제출 중 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
      setPendingFormData(null);
    }
  };

  const cancelAd = () => {
    setShowAd(false);
    setPendingFormData(null);
  };

  return { handleSubmit, isSubmitting, errorMessage, showAd, confirmSubmit, cancelAd };
}
