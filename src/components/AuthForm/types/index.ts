export interface AuthFormProps {
  formTitle: string;
  formSubTitle: string;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
}

export interface ErrorData {
  [key: string]: string | null;
}
