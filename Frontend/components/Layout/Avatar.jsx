import { css } from "@emotion/css";

const AvatarCss = css`
  width: 100%;
  height: 100%;
  .default {
    margin-bottom: -35%;
  }
`;

function Avatar({ picture }) {
  return (
    <div className={AvatarCss}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {picture ? (
        <img src={picture} alt="userphoto" />
      ) : picture === "" ? (
        <img className="default" src="/images/user.png" alt="userphoto" />
      ) : null}
    </div>
  );
}

export default Avatar;
