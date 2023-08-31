export interface AuthFormProps {
  formTitle: string;
  formSubTitle: string;
  children?: React.ReactNode;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
}

export interface ErrorData {
  [key: string]: string | null;
}
