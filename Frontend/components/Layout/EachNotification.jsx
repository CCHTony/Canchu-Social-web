/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from "react";
import { css } from "@emotion/css";
import useReadNotification from "../../hooks/useReadNotification";

const EachNotificationCss = css`
  position: relative;
  cursor: pointer;
  .checkedNotification {
    .checkCircle {
      display: none;
    }
    p,
    b {
      color: #909090;
    }
  }

  padding: 15px 25px;
  /* margin: 0 25px; */
  border-bottom: 1px solid #d1cace;
  line-height: 24px;

  &:hover {
    background: #eee;
  }

  .checkCircle {
    position: absolute;
    right: 15px;
    margin-top: -8px;
  }

  /* .eventFunction {
            position: absolute;
            right: 10px;
            margin-top: -45px; // temp
            display: flex;
            .check,
            .cancel {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: var(--main-color);
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 8px;
              font-weight: bold;
            }
          } */

  p {
    font-size: 16px;
  }
  b {
    font-size: 14px;
    font-weight: bold;
    color: var(--main-color);
  }
`;

function EachNotification({ event }) {
  const [isChecked, setIsChecked] = useState(event.is_read);
  const { readNotification } = useReadNotification();
  const clickNotification = () => {
    setIsChecked(true);
    readNotification(event.id);
  };
  return (
    <div className={EachNotificationCss} onClick={() => clickNotification()}>
      <div className={isChecked ? "checkedNotification" : ""}>
        <p>{event.summary}</p>
        <b>{event.created_at}</b>
        <img
          className="checkCircle"
          src="/images/check_circle.svg"
          alt="check"
        />
        {/* <div className="eventFunction">
          <div className="check">v</div>
          <div className="cancel">x</div>
        </div> */}
      </div>
    </div>
  );
}

export default EachNotification;
