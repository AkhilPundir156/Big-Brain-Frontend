export const googleAuth = () => {
    const SERVER_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${SERVER_URL}/user/auth/google`;
};
