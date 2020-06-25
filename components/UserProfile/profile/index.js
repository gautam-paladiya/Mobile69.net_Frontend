import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../../utils/Helper";
import { runForceUpdate, useForceUpdate } from "react-forceupdate";

export default function (props) {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);

  useEffect(() => {
    console.log("call effect", props);
    AxiosInstance.post("/post/userDownload", { userId: props.user._id }).then(
      (res, err) => {
        console.log("userDownload", res);
        if (res) {
          setDownload(res.data.download);
          setUpload(res.data.upload);
        }
      }
    );
    if (props.user.profile) {
      setUrl(props.user.profile);
    }
  }, []);

  const fileSelectedHandler = async (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setUrl(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", props.user._id);
      AxiosInstance.post("/auth/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          setProgress(
            parseInt(
              Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
            )
          );
        },
      })
        .then((res) => {
          if (res) {
            console.log(res);
            window.location.reload(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <div className="user-profile flex-sm-column flex-md-row">
        <input
          id="myInput"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            fileSelectedHandler(e);
          }}
          accept="image/*"
        />
        <label htmlFor="myInput">
          <div
            className="img"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/profile/" + url
              }), url(/img/user.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <img className="edit-icon" src="/svg/edit.svg" />
          </div>
        </label>
        <div className="user-detail">
          <h3 className="user-name">{props.user.name}</h3>
          <div className="d-flex ">
            <div className="icon">
              <img src="/svg/downloads.svg" />
              <span className="count">{download}</span>
            </div>
            <div className="icon">
              <img src="/svg/uploads.svg" />{" "}
              <span className="count">{upload}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider-single" />
    </div>
  );
}
