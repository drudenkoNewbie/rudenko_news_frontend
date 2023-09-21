import { User } from '../types';

export const getAvatarPath = ({avatarUrl}: User) => {
  const imgBaseUrl = import.meta.env.VITE_APP_PUBLIC_URL;

  return avatarUrl && `${imgBaseUrl}/avatar/${avatarUrl}`;
}