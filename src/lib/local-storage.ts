export const getLSToken = () => {
  try{
    return localStorage.getItem('token');
  } catch (e) {
    console.log(e);
  }
};
export const setLSToken = (token: string) => {
  try {
    console.log(token);
    return localStorage.setItem('token', token);
  } catch (e) {
    console.log(e);
  }
};

export const removeLSToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (e) {
    console.log(e);
  }
};
