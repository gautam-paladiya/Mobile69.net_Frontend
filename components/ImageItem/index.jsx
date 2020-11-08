import Img from "react-image";
import Link from "next/link";
import { AxiosInstance } from "../../utils/Helper";
import styles from "./index.module.css";
import clsx from "clsx";

export default  function(props)  {
  const deleteImage = async (id) => {
    const result = await AxiosInstance.post(
      "/post/delete",
      { id: id },
      {
        headers: {
          "auth-token": props.currentUser.jwt,
        },
      }
    );
    console.log(result);
    if (result.status === 200) {
      return id;
    }
    console.log(result);
  };
  return (
    <div className={clsx(props.col, styles.listItem, "align-self-center")}>
      <Link href="/detail/[id]" as={`/detail/${props.item._id}`}>
        <div className="card">
          <Img
            alt={`${props.item.fileOriginName}`}
            className={clsx("card-img", styles.imgCover)}
            src={`${process.env.PUBLIC_URL}/resize/${props.item.fileName}`}
            // loader={<GridLoader size={20} margin={10} />}
            // unloader={<GridLoader size={20} margin={10} />}
          />
          <div className="card-img-overlay border-0 ">
            {props.name && (
              <h5 className={styles.cardTitle}>{props.item.fileOriginName}</h5>
            )}
          </div>
        </div>
      </Link>
      {props.delete && (
        <img
          alt="close"
          className={styles.btnClose}
          src="/svg/close.svg"
          width={25}
          height={25}
          onClick={async () => {
            let deleteId = await deleteImage(props.item._id);
            props.updateGallery(deleteId);
          }}
        />
      )}
      {props.download && (
        <div className={styles.download}>
          <h5 className={clsx("text-primary", styles.fileText)}>
            <img
              alt="Download"
              src="/svg/download.svg"
              className="ml-4 mr-2 align-self-center text-primary"
            />
          </h5>

          <h5 className={clsx("text-primary", styles.fileText)}>
            {props.item.downloads}
          </h5>
        </div>
      )}
    </div>
  );
};