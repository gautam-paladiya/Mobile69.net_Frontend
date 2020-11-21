import React, { Component } from "react";
import Page404 from "../page404/index";
import { AxiosInstance } from "../../utils/Helper";
import { connect } from "react-redux";
import SharePopup from "../sharePopUp";
import ImageOverView from "../imageoverview";
import CountDown from "../countDown";
import MusicOverView from "../musicoverview";
import download from "../../utils/Downloads";
import Link from "next/link";
import ParentLoading from "../parentLoading";
import styles from './index.module.css';
import clsx from "clsx";
import List from "../Directory/List";

class ItemOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      pageFound: props.pageFound,
      post: props.item,
      sharePopup: false,
      isZoom: false,
      countDown: false,
      posts: [],
      loading: true,
      isLast: false,
      pageNum: 1,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log("ItemOverViewComponents", this.props);

    this.getData();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("nextState", nextState);
  //   console.log("nextProps", nextProps);
  //   if (this.props.id == nextProps.id) {
  //     console.log("return");
  //     return false;
  //   }
  //   return true;
  // }

  getData = () => {
    if (!this.state.isLast) {
      try {
        AxiosInstance.post(
          `/post/${
            this.state.post.types === "image"
              ? "findRelatedWallpapers"
              : "findRelatedRingtones"
          }`,
          JSON.stringify({
            pageNum: this.state.pageNum,
            tags: this.state.post.fileTags,
          }),
          {
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        ).then(async (json) => {
          if (json.data.files && json.status == 200) {
            if (this.state.pageNum === 1) {
              var filterFiles = json.data.files.filter(
                (post) => post._id != this.state.post._id
              );
              // filterFiles.unshift(this.state.post);
              await this.setState({
                posts: filterFiles,
                loading: false,
                isLast: json.data.isLast,
              });
            } else {
              await this.setState({
                posts: [...this.state.posts, ...json.data.files],
                loading: false,
                isLast: json.data.isLast,
              });
            }
            console.log("posts", this.state.posts);
          } else {
            await this.setState({
              loading: false,
            });
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  fetchPost = async () => {
    const result = await AxiosInstance.post("/post/findRelatedWallpapers", {
      tags: this.props.item.tags,
      pageNum: 1,
    });
    console.log("file ", result);

    if (result) {
      if (result.data.status == 200) {
       
        this.setState({
          post: result.data.post,
        });
      } else {
        this.setState({ pageFound: false });
      }
    }
  };

  plusDownload = async (event) => {
    const result = await AxiosInstance.post("/post/plusDownload", {
      postId: this.state.post._id,
    });
    if (result) {
      if (result.data.status == 200) {
        var newPost = this.state.post;
        newPost.downloads++;
        this.setState({ post: newPost });
      }
    }
    const shareData = {
      title: `${process.env.NAME_SPACE}`,
      text:
        "Download free Latest Ringtones and HD, mobile, wallaper Free on Mobile69.",
      url: `${process.env.DOMAIN}/detail/${this.state.post.fileName}`,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      // shareDialog.classList.add('is-open');
    }
  };

  downloadImage = () => {};

  searchTag(tag) {
    this.props.history.push(`/find/${tag}`);
  }

  toggleShare = () => {
    this.setState({ sharePopup: !this.state.sharePopup });
  };

  hide = () => {
    this.setState({ sharePopup: false });
  };

  toggleZoom = () => {
    this.setState({ isZoom: !this.state.isZoom });
  };

  toggleCountDownHandler = (toggle) => {
    this.setState({ countDown: toggle });
  };

  downloadHandle = () => {
    download(
      `${process.env.PUBLIC_URL}/${this.state.post.types}/${this.state.post.fileName}`,
      `${this.state.post.fileOriginName}`
    );
    this.plusDownload();
  };

  render() {
    console.log(this.state.countDown);
    return this.state.pageFound ? (
      this.state.post ? (
        <div className={styles.parent}>
          {this.state.countDown && (
            <CountDown
              toggleCountDown={(toggle) => this.toggleCountDownHandler(toggle)}
              download={this.downloadHandle}
            />
          )}
          <div>
            {!this.state.isZoom && (
              <div className={clsx("pt-2 d-flex flex-column align-items-md-start flex-md-row ",styles.headerParent)}>
                <div className={clsx("col-12 col-md-10",styles.left)}>
                  <div className="d-flex">
                    <div
                      style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/profile/${this.state.post.userId}), url(/img/user.png)`,
                      }}
                      className={styles.imgProfile}
                      alt="profile"
                    />
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        <h2 className={styles.fileText}>
                          {this.state.post.fileOriginName}
                        </h2>
                        <h5 className={`${styles.fileText} text-primary `}>
                          <img
                            src="/svg/download.svg"
                            className="ml-4 mr-2 align-self-center text-primary"
                          />
                        </h5>

                        <h5 className={`${styles.fileText} text-primary `}>
                          {this.state.post.downloads}
                        </h5>
                      </div>
                      <span className={`${styles.userText}text-muted`}>
                        by {this.state.post.userName}
                      </span>
                    </div>
                  </div>
                  <div className={styles.tagRow}>
                    {this.state.post.fileTags.map((tag, index) => {
                      return (
                        <Link href={`/find/${tag}`} key={index}>
                          <h6 className={`badge badge-pill badge-info ${styles.tagBadge}`}>
                            {tag}
                          </h6>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="col-12 mt-4 col-md-2 d-flex justify-content-md-end  justify-content-center">
                  <img
                    alt="Share"
                    src="/svg/share.svg"
                    type="button"
                    className="btn btn-primary btn-md mr-2 text-white"
                    onClick={this.toggleShare}
                  />

                  <button
                    // href={`${process.env.PUBLIC_URL}/${this.state.post.types}/${this.state.post.fileName}`}
                    // download={`${this.state.post.fileOriginName}`}
                    style={{ textDecoration: "none" }}
                    className=" btn btn-primary btn-md"
                    onClick={() => {
                      setTimeout(() => {
                        this.toggleCountDownHandler(true);
                      }, 1000);
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.media}>
            {this.state.post.types == "image" ? (
              <ImageOverView
                item={this.state.post}
                isZoom={this.state.isZoom}
                toggleZoom={this.toggleZoom}
              />
            ) : (
              <MusicOverView
                item={this.state.post}
                isActive={false}
                col="col-md-12 col-12"
              />
            )}
          </div>

          <List posts={this.state.posts}/>

          {this.state.sharePopup && (
            <SharePopup
              shareLink={`${window.location.href}`}
              hide={this.hide}
              img={
                this.state.post.types == "image"
                  ? `${process.env.DOMAIN}/detail/${this.state.post.fileName}`
                  : `${process.env.DOMAIN}/original.png`
              }
            />
          )}
        </div>
      ) : (
        <ParentLoading />
      )
    ) : (
      <Page404 />
    );
  }
}

export default connect((state) => state)(ItemOverView);
