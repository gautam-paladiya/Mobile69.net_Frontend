import { CircularProgressbar } from "react-circular-progressbar";
import { useState } from "react";
import AndroidIcon from "../../assets/img/androidIcon.png";
import IosIcon from "../../assets/svg/ios.svg";

export default function CountDown(props) {
  var total = 3;
  const [timeleft, setTimeLeft] = useState(total);
  if (timeleft > 0) {
    setTimeout(() => {
      setTimeLeft(timeleft - 1);
    }, 1000);
  } else {
    props.toggleCountDown(false);
    props.download();
  }

  return (
    <div className="count-parent card">
      <div className="content col-md-6 col-10">
        <span>
          <img
            className="btn-close"
            src="/svg/close.svg"
            alt="close"
            onClick={() => {
              setTimeLeft(0);
              props.toggleCountDown(false);
            }}
            width={30}
            height={30}
          />
        </span>
        {/* <h3>To download the item</h3> */}
        <img
          width={120}
          height={120}
          src="/original.png"
          alt={`Download ${process.env.NAME_SPACE} Ringtones & Wallpapers`}
          className="original-img "
        />
        <h4>{`Download ${process.env.NAME_SPACE} Ringtones & Wallpapers`}</h4>
        <div className="mt-2">
          <a href={`${process.env.ANDROID_ID}`} target="_blank">
            <img
              className="col-md-6 col-6"
              src={AndroidIcon}
              alt="Google play store"
            />
          </a>
          <a href={`${process.env.IOS_ID}`} target="_blank">
            <img className="col-md-6 col-6" src={IosIcon} alt="Apple store" />
          </a>
        </div>
        <h5 className="mt-2">OR Wait for</h5>
        <div className="content-down m-3">
          <CircularProgressbar
            className="progress"
            value={timeleft}
            maxValue={total}
            text={`${timeleft}s`}
          />
          <div className="title">
            <h5></h5>
          </div>
        </div>
      </div>
    </div>
  );
}
