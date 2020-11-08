import React from "react";
import Img from "react-image";
import { GridLoader } from "react-spinners";
import styles from "./index.module.css";

export default function ImageOverView(props) {
  const onLoadComplete = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="card card-preview">
        <Img
          alt={`${props.item.fileOriginName}`}
          className={
            !props.isZoom ? `${styles.imgPreview} card-img` : `${styles.zoomIn}`
          }
          src={`${process.env.PUBLIC_URL}/${props.item.types}/${props.item.fileName}`}
          loader={<GridLoader size={20} margin={10} />}
          unloader={<GridLoader size={20} margin={10} />}
          onLoad={onLoadComplete}
        />

        <div onClick={props.toggleZoom} className={styles.imgZoom}>
          {props.isZoom ? (
            <img
              src="/svg/zoom-out.svg"
              alt="Zoom Out"
              width={35}
              height={35}
            />
          ) : (
            <img src="/svg/zoom-in.svg" alt="Zoom In" width={35} height={35} />
          )}
        </div>
      </div>
    </div>
  );
}
