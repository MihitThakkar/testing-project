// Generate a random 5-digit code
export const generateAuthCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Save auth code to localStorage
export const saveAuthCode = (code: string) => {
  localStorage.setItem('authCode', code);
};

// Get auth code from localStorage
export const getAuthCode = () => {
  return localStorage.getItem('authCode');
};

// Remove auth code from localStorage
export const removeAuthCode = () => {
  localStorage.removeItem('authCode');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthCode();
};