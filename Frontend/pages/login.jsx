/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from "@emotion/css";
import { useState } from "react";
import { parseCookies } from "nookies";
import useLogIn from "../hooks/useLogIn";
import Button from "../components/Layout/Button";
import useSignUp from "../hooks/useSingUp";
import breakpoints from "../shared/breakpoints";

const LoginCss = css`
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .errorMessage {
    color: red;
  }

  .login {
    width: 55%;
    display: flex;
    overflow: hidden;
    .form {
      width: 100%;
      padding: 45px 105px;
      text-align: center;
      .logo {
        width: 185px;
        margin-top: 40px;
      }
      h1 {
        margin-top: 55px;
        font-size: 36px;
        font-family: "Outfit";
        line-height: 54px;
      }
      form {
        margin-top: 35px;

        .inputArea {
          text-align: left;
          margin-bottom: 15px;
        }

        label {
          display: inline-block;
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 4px;
        }

        input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #bfbfbf;
          border-radius: 6px;
          padding: 8px 14px;
          margin-bottom: 20px;
        }
        p {
          margin-top: 12px;
          /* font-weight: bold; */
          a {
            color: var(--main-color);
            cursor: pointer;
          }
        }
      }
    }
    .loginStyle {
      min-height: 100%;
      min-width: 200px;
      background: var(--main-color);
    }
  }

  @media ${breakpoints.tablet} {
    .login {
      width: 80%;
    }
  }
  @media ${breakpoints.phone} {
    .login {
      width: 95%;
      .form {
        padding: 45px;
      }
    }
    .loginStyle {
      display: none;
    }
  }
`;

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { logIn, error } = useLogIn();
  const { signUp, error: signUpError } = useSignUp();

  const handleLogIn = (e) => {
    e.preventDefault();
    logIn(email, password);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      alert("兩次密碼不一致，請檢查！")
    } else signUp(name, email, password);
  };
  return (
    <div className={LoginCss}>
      <div className="login box">
        <div className="form">
          <img className="logo" src="/images/logo.svg" alt="logo" />
          <h1>會員{isSignUp ? "註冊" : "登入"}</h1>
          {!isSignUp ? (
            <form onSubmit={(e) => handleLogIn(e)}>
              <div className="inputArea">
                <label>電子郵件</label>
                <br />
                <input
                  type="text"
                  placeholder="例: shirney@appworks.tw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>密碼</label>
                <br />
                <input
                  type="password"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="errorMessage">{error}</p>}
              </div>
              <Button type="submit">登入</Button>
              <br />
              <p>
                尚未成為會員？<a onClick={() => setIsSignUp(true)}>會員註冊</a>
              </p>
            </form>
          ) : (
            <form onSubmit={(e) => handleSignUp(e)}>
              <div className="inputArea">
                <label>使用者名稱</label>
                <br />
                <input
                  type="text"
                  placeholder="例: PJ Wang"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>電子郵件</label>
                <br />
                <input
                  type="text"
                  placeholder="例: shirney@appworks.tw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>密碼</label>
                <br />
                <input
                  type="password"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>再次輸入密碼</label>
                <br />
                <input
                  type="password"
                  placeholder="密碼"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
                {signUpError && <p className="errorMessage">{signUpError}</p>}
              </div>
              <Button type="submit">註冊</Button>
              <br />
              <p>
                已經是會員了？<a onClick={() => setIsSignUp(false)}>會員登入</a>
              </p>
            </form>
          )}
        </div>
        <div className="loginStyle">{/*  */}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { accessToken } = parseCookies(ctx);

  if (accessToken) {
    return {
      redirect: {
        destination: "/", // 如果已登入，將用戶重定向到首頁或其他頁面
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default Login;
