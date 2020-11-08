import React from "react";
import Link from "next/link";
import { getIsAuthenticated, handleLogout } from "../../utils/AuthService ";
import { useRouter } from "next/router";
import closeIcon from "../../assets/svg/close.svg";
import AndroidIcon from "../../assets/img/androidIcon.png";
import IosIcon from "../../assets/svg/ios.svg";
import { Transition } from 'react-transition-group';
import clsx from "clsx";
import styles from './index.module.css'

function Slider(props) {
  const handleSignin = () => {
    getIsAuthenticated() && handleLogout();
    props.toggleSlider();
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

  return (
    <Transition in={true}  timeout={200}>
        {state => (
    <div className={styles.slider} style={{
      ...transitionStyles[state]
    }} onClick={() => props.toggleSlider()}>
      <div className={clsx("text-left col-md-3 col-sm-12 ",styles.content)}>
        <img
          alt="close"
          src={closeIcon}
          width={40}
          height={40}
          className={`text-black py-2 align-self-start ${styles.btnClose}`}
          onClick={() => props.toggleSlider()}
        />

        <h6 className="text-muted">Content</h6>
        <div className="d-flex flex-column category">
          <Link href="/all">
            <div className={styles.contentItem}>Home</div>
          </Link>

          <Link href="/wallpapers">
            <div className={styles.contentItem}>Wallpapers</div>
          </Link>

          <Link href="/ringtones">
            <div className={styles.contentItem}>Ringtones</div>
          </Link>
        </div>
        <h6 className="text-muted py-2">Share Your Content</h6>
        <div className="d-flex flex-column justify-content-left">
          <Link href="/uploads">
            <button
              type="button"
              style={{
                fontSize: 20,
                textDecorationStyle: "double",
                fontWeight: "bold",
                borderRadius: 20,
                padding: 5,
                margin: 10,
              }}
              className="btn btn-primary"
            >
              Uploads
            </button>
          </Link>
        </div>
        {getIsAuthenticated() === "true" && (
          <button
            type="button"
            onClick={handleSignin}
            className="btn btn-outline-danger my-4"
            style={{
              fontSize: 20,
              textDecorationStyle: "double",
              fontWeight: "bold",
              borderRadius: 20,
              padding: 5,
              margin: 10,
              marginTop: 5,
            }}
          >
            Logout
          </button>
        )}

        <h6 className="text-muted py-2">Get the app</h6>
        <a href={`${process.env.ANDROID_ID}`} style={{ margin: 5 }}>
          <img
            alt="Google play store"
            src={AndroidIcon}
            width={135}
            height={40}
          />
        </a>

        <a href={`${process.env.IOS_ID}`} style={{ margin: 5 }}>
          <img alt="Apple store" src={IosIcon} width={135} height={40} />
        </a>

        <h6 className="text-muted py-2 mt-2">Important info</h6>
        <a href="/privacy" target="_blank" className={styles.contentItem}>
          Privacy
        </a>
        <a href="/terms" target="_blank" className={styles.contentItem}>
          Terms &amp; Condition
        </a>
        <a href="/copyright" target="_blank" className={styles.contentItem}>
          DMCA/Copyright
        </a>
      </div>
    </div>
    )}
    </Transition>
  );
}

export default Slider;
