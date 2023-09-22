export const getAvatarPath = (avatarUrl: string | null) => {
  const imgBaseUrl = import.meta.env.VITE_APP_PUBLIC_URL;

  if (avatarUrl == null) return '';

  return `${imgBaseUrl}/avatar/${avatarUrl}`;
}
