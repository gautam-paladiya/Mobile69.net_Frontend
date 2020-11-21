import Img from "react-image";
import { AxiosInstance } from "../../utils/Helper";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useRouter } from 'next/router'

export default  function(props)  {

  const router = useRouter()

  // const handleNavigate = (id)=>{
  //   router.replace(`/detail/${props.item._id}`)
  //   router.events.on('routeChangeComplete', (url)=>{
  //     router.reload()
  //   })
  // }

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
    <div className={clsx(props.col, styles.listItem, "align-self-center animate__animated animate__fadeIn")}>
      <a  href={`/detail/${props.item._id}`} >
        <div className="card" >
          <Img
          // width={200}
          // height={300}
            alt={`${props.item.fileOriginName}`}
            className={clsx("card-img", styles.imgCover)}
            src={`${process.env.PUBLIC_URL}/resize/${props.item.fileName}`}
            // loader={<GridLoader size={20} margin={10} />}
            // unloader={<GridLoader size={20} margin={10} />}
          />
          <div className="card-img-overlay border-0 ">
            {props.name && (
              <h2 className={styles.cardTitle}>{props.item.fileOriginName}</h2>
            )}
          </div>
        </div>
      </a>
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
              alt={props.item.fileOriginName}
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
