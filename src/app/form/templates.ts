const API_BASE =
  'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect';

export interface TemplateConfig {
  id: string;
  name: string;
  src: string;
  dark: string;
  light: string;
  endpoint: string;
  category: 'preset' | 'custom';
}

export const templates: TemplateConfig[] = [
  {
    id: 'tosspay1',
    name: 'Toss: 로고가 가운데 있는 템플릿',
    src: '/tosspay1.png',
    dark: '',
    light: '',
    endpoint: `${API_BASE}/tosspay`,
    category: 'preset',
  },
  {
    id: 'kakaopay1',
    name: 'KakaoPay: 로고가 가운데 있는 템플릿',
    src: '/kakaopay1.png',
    dark: '',
    light: '',
    endpoint: `${API_BASE}/kakaopay`,
    category: 'preset',
  },
  {
    id: 'linkedin3',
    name: 'LinkedIn: 가운데 정렬된 템플릿',
    src: '',
    dark: '/Linkedin3Dark.png',
    light: '/Linkedin3Light.png',
    endpoint: `${API_BASE}/linkedin`,
    category: 'preset',
  },
  {
    id: 'linkedin2',
    name: 'LinkedIn: 직무를 강조하는 템플릿',
    src: '',
    dark: '/Linkedin2Dark.png',
    light: '/Linkedin2Light.png',
    endpoint: `${API_BASE}/linkedin`,
    category: 'preset',
  },
  {
    id: 'linkedin1',
    name: 'LinkedIn: 근무기간을 포함하는 템플릿',
    src: '',
    dark: '/Linkedin1Dark.png',
    light: '/Linkedin1Light.png',
    endpoint: `${API_BASE}/linkedin`,
    category: 'preset',
  },
  {
    id: 'insta_special',
    name: 'Instagram: 컬러풀한 템플릿',
    src: '/InstaSpecial.png',
    dark: '',
    light: '',
    endpoint: `${API_BASE}/instagram`,
    category: 'preset',
  },
  {
    id: 'insta1',
    name: 'Instagram: 깔끔한 템플릿',
    src: '',
    dark: '/Insta1Dark.png',
    light: '/Insta1Light.png',
    endpoint: `${API_BASE}/instagram`,
    category: 'preset',
  },
];

export function getEndpointForTemplate(templateId: string): string {
  const template = templates.find((t) => t.id === templateId);
  return template?.endpoint ?? `${API_BASE}/default`;
}
