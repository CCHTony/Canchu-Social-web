/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

// 這裡定義你的全局變量
export const mainColor = "#5458F7";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          :root {
            // 將全局變量分配給 CSS 變量
            --main-color: ${mainColor};
          }

          .box {
            border: 1px solid rgba(211, 211, 211, 0.56);
            border-radius: 20px;
            background: white;
          }

          textarea {
            width: 100%;
            background: #f0f2f5;
            border: 1px solid #d9d9d9;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            resize: none;
          }

          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }

          .circleImg {
            background: #d9d9d9;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .segmentLine {
            background: #d9d9d9;
            height: 1px;
            margin: 20px 0;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
