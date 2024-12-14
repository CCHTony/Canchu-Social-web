import { destroyCookie } from "nookies";

const useLogout = () => {
  const logOut = () => {
    destroyCookie(null, 'accessToken', {
      path: '/'
    });
    // console.log("logout")
    window.location.href = "/login"
  };

  return { logOut };
};

export default useLogout;
