export interface Insta1Form {
  template: string;
  thumbnail?: string;
  name?: string;
  id?: string;
  bio?: string;
  code: string;
  email: string;
  theme: string;
}

export interface InstaSpecialForm {
  template: string;
  thumbnail?: string;
  name?: string;
  id?: string;
  bio?: string;
  code: string;
  email: string;
  theme: string;
}

export interface Linkedin1Form {
  template: string;
  thumbnail?: string;
  name?: string;
  role?: string;
  company?: string;
  joinDate?: string;
  code: string;
  email: string;
  theme: string;
}

export interface Linkedin2Form {
  template: string;
  thumbnail?: string;
  name?: string;
  role?: string;
  company?: string;
  code: string;
  email: string;
  theme: string;
}

export type FormDataTypes = Insta1Form | InstaSpecialForm | Linkedin1Form | Linkedin2Form;
