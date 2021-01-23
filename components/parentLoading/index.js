import React from "react";
import { RingLoader } from "react-spinners";
import styles from "./index.module.css";

export default function ParentLoading() {
  return (
    <div className={styles.loading}>
      <div className={styles.waves}>
        <RingLoader size={200} />
      </div>
    </div>
  );
}
