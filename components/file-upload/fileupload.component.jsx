import React, { Component, Fragment } from "react";
import Message from "../message";
import Progress from "../progress/progress.component";
import { connect } from "react-redux";
import { all } from "../../utils/data";
import { sliceAudioBuffer } from "../../utils/MusicTrimmer.js/audio-helper";
import {
  isAudio,
  readBlobURL,
  download,
  rename,
} from "../../utils/MusicTrimmer.js/utils";
import ParentLoading from "../parentLoading";
// import { encode } from "../../utils/MusicTrimmer.js/worker-client";
import { AxiosInstance } from "../../utils/Helper";
var lamejs = require("lamejs");
import WaveSurfer from "wavesurfer.js";
import styles from './index.module.scss'

class FileuploadComponent extends Component {
  constructor(props) {
    super(props);
    console.log("file prop", props);
    this.messageRef = React.createRef();
    this.state = {
      files: [],
      file: props.fileState.file,
      filename: props.fileState.filename,
      fileOriginName: props.fileState.fileOriginName,
      filepath: "",
      message: "",
      progress: 0,
      success: Boolean,
      url: props.fileState.url,
      tags: [],
      loading: true,
      upload: [],
      filetype: props.fileState.filetype,
      isPlay: false,
    };
    this.videoExt = [];
    this.imageExt = ["jpg", "gif", "bmp", "png", "jpeg", "ico"];
    this.musicExt = ["wav", "mp3", "aac", "ogg"];
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.filetype === "audio") {
        this.initMusic(this.state.file);
      }
      this.setState({ loading: false });
    }, 1000);
  }

  // shouldComponentUpdate(nextPro, nextState) {
  //   if (this.state !== nextState) {
  //     return true;
  //   }
  // }

  initMusic = (file) => {
    this.wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      cursorColor: "#4353FF",
      cursorWidth: 5,
      barWidth: 1,
      barRadius: 3,
      height: 100,
      barGap: 3,
      scrollParent: true,
      plugins: [
        window.WaveSurfer.regions.create({
          regions: [],
        }),
      ],
    });
    this.wavesurfer.on("ready", () => {
      this.wavesurfer.play.bind(this.wavesurfer);
      this.wavesurfer.addRegion({
        id: "main",
        start: 0,
        end: this.wavesurfer.getDuration(),
        loop: true,
        color: "hsla(100, 100%, 30%, 0.5)",
        handleStyle: {
          left: {
            background:
              "url(https://web-assets.zobj.net/web/53e81d1926/assets/handle.svg) no-repeat",

            cursor: "col-resize",
            position: "absolute",
            top: "0px",
            maxWidth: "150px",
            minWidth: "20px",
            left: "0px",
          },
          right: {
            background:
              "url(https://web-assets.zobj.net/web/53e81d1926/assets/handle.svg) no-repeat",

            cursor: "col-resize",
            position: "absolute",
            top: "0px",
            maxWidth: "150px",
            minWidth: "20px",
            right: "0px",
          },
        },
      });
    });
    this.wavesurfer.load(readBlobURL(file));
  };

  onTagKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      let val = e.target.value.trim();
      e.target.value = "";
      val &&
        this.setState((preState) => ({
          tags: [...preState.tags, val],
        }));
    }
  };

  removeTag = (removeTag) => {
    console.log("remove tag");
    this.setState({
      tags: this.state.tags.filter((tag) => {
        return tag !== removeTag;
      }),
    });
  };

  onChangeFileName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ fileOriginName: e.target.value });
  };
  onHandleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.onSubmit();
      }, 500);
    });
  };

  onSubmit = async () => {
    // e.preventDefault();
    await this.setState({ loading: true });
    this.forceUpdate();
    if (this.state.tags.length <= 0) {
      const tag = document.getElementById("inputfilelabel");
      if (tag.value !== "") {
        await this.setState((preState) => ({
          tags: [...preState.tags, tag.value],
        }));
      } else {
        this.setState({ message: "Please enter teg with spacebar" });
        this.setState({ success: false });
        setTimeout(() => {
          window.scrollTo(0, this.messageRef.current.offsetTop);
        }, 200);
        return false;
      }
    }

    if (this.state.filetype === "audio") {
      console.log("handle cut");
      await this.handlecut(false);
    }

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("fileOriginName", this.state.fileOriginName);
    formData.append("fileTag", this.state.tags);
    formData.append("userName", this.props.currentUser.name);
    formData.append("fileType", this.state.filetype);
    console.log("form data ", JSON.stringify(formData));
    let res;
    try {
      res = await AxiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": this.props.currentUser.jwt,
        },
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            progress: parseInt(
              Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
            ),
          });
        },
      });
      if (this.wavesurfer) {
        this.wavesurfer.empty();
      }
      const { filename, filepath, savedFile } = res.data;

      this.setState({
        file: "",
        filename: "Choose File",
        fileOriginName: "",
        filepath: "",
        progress: 0,
        url: "",
        tags: [],
        filetype: "",
        loading: false,
        filepath: filepath,
        message: "File Uploaded",
        success: true,
        files: [savedFile, ...this.state.files],
      });
      document.getElementById("inputfilelabel").value = "";

      console.log("savedFile ", savedFile);
      this.props.onUpdate(savedFile);
    } catch (error) {
      console.info(error.message);

      setTimeout(
        () =>
          this.setState({
            message: "",
            success: false,
            loading: false,
          }),
        1000
      );

      if (error.response) {
        if (error.response.status === 500) {
          console.log("server is down");
          this.setState({ message: "Internal Server Error" });
        } else {
          console.log(error.response.data.message);
          if (error.response.data.message) {
            this.setState({ message: error.response.data.message });
          }
        }
      }
      this.setState({ message: error.message });
    }
    this.props.togglePick(false);
  };

  handlePlayPause = () => {
    if (this.state.isPlay) {
      this.setState({ isPlay: false }, (newState) => {
        this.wavesurfer.pause();
      });
    } else {
      this.setState({ isPlay: true }, (newState) => {
        this.wavesurfer.play();
      });
    }
  };

  handlecut = async (isDownload) => {
    const audioSliced = sliceAudioBuffer(
      this.wavesurfer.backend.buffer,
      ~~(
        (this.wavesurfer.backend.buffer.length *
          this.wavesurfer.regions.list["main"].start) /
        this.wavesurfer.backend.getDuration()
      ),
      ~~(
        (this.wavesurfer.backend.buffer.length *
          this.wavesurfer.regions.list["main"].end) /
        this.wavesurfer.backend.getDuration()
      )
    );
    var mp3encoder = new lamejs.Mp3Encoder(
      audioSliced.numberOfChannels,
      audioSliced.sampleRate,
      256
    ); //mono 44.1khz encode to 128kbps
    var sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
    var leftChannel = new Float32Array(audioSliced.getChannelData(0).length);

    for (var i = 0; i < audioSliced.getChannelData(0).length; i++) {
      leftChannel[i] = audioSliced.getChannelData(0)[i] * 32767.5;
    }

    var mp3Data = [];
    for (var i = 0; i < leftChannel.length; i += sampleBlockSize) {
      var left = leftChannel.subarray(i, i + sampleBlockSize);
      var mp3buf = mp3encoder.encodeBuffer(left, left);

      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    var mp3buf = mp3encoder.flush(); //finish writing mp3
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    var blob = new Blob(mp3Data, { type: "audio/mp3" });
    var myFile = await new File([blob], `${this.state.file.name}`, {
      lastModified: new Date().now,
    });
    var url = window.URL.createObjectURL(blob);

    await this.setState(
      { url: url, loading: false, file: myFile },
      (newState) => {
        if (isDownload) {
          download(url, rename(this.state.file.name, "mp3"));
          this.wavesurfer.load(readBlobURL(this.state.file));
        }
      }
    );

    // await encode(audioSliced, "mp3")
    //   .then(async (file) => {
    //     console.log("encode");
    //     var url = URL.createObjectURL(file);
    //     console.log("url ", url);
    //     this.setState({ url: url });
    //     var myFile = await new File([file], `${this.state.file.name}.mp3`, {
    //       lastModified: new Date().now,
    //     });

    //     this.setState({ file: myFile }, (newState) => {
    //       if (isDownload) {
    //         this.setState({ loading: false });
    //         download(url, rename(this.state.file.name, "mp3"));
    //       }
    //     });
    //   })
    //   .catch((e) => console.error(e))
    //   .then(() => {
    //     console.log("processsing finish ");
    //     this.setState({ loading: false });
    //   });
  };

  render() {
    console.log("progress ", this.state.loading);

    return (
      <div className={styles.parentFileupload}>
        <div style={{ position: "relative" }}>
          <img
            src="/svg/close.svg"
            width={40}
            height={40}
            className={styles.closeBtn}
            onClick={() => this.props.togglePick(false)}
          />
        </div>
        {this.state.loading ? <ParentLoading /> : null}
        <div className={this.state.filetype === "audio" ? "d-block" : "d-none"}>
          <div id="waveform" className={styles.wave}></div>
          <div className="d-flex justify-content-center d-">
            <button
              className={`btn btn-primary m-1 ${styles.btnSubmit}`}
              onClick={this.handlePlayPause}
            >
              {this.state.isPlay ? "Pause" : "Play"}
            </button>
            <button
              className={`btn btn-primary m-1 ${styles.btnSubmit}`}
              onClick={() => this.handlecut(true)}
            >
              Download
            </button>
          </div>
        </div>

        {this.props.isUp}

        {this.state.filetype === "image" && (
          <div className="row mt-5 align-self-center">
            <div className="m-auto">
              <img
                // src={`${process.env.PUBLIC_URL}${this.state.filepath}`}
                src={this.state.url}
                alt={this.state.filename}
                className={`col-12 my-3 col-md-9 card ${styles.preview}`}
              />
            </div>
          </div>
        )}

        {/* <button onClick={}></button> */}
        <form className="d-flex flex-column ">
          <div className="form-group mt-4">
            <label style={{ color: "white",padding:'0.5rem', fontSize:'1.5rem',fontFamily:'var(--Lexend)' }} htmlFor="inputFileName">
              File Name
            </label>
            <input
              maxLength="10"
              value={this.state.fileOriginName}
              onChange={this.onChangeFileName}
              type="text"
              className="form-control"
              id="inputFileName"
              aria-describedby="Enter File Related Name"
              placeholder="Enter file name"
              required
            />
            <small id="emailHelp" className="form-text text-white">
              Enter File Related Name.
            </small>
          </div>
          <div className="form-group">
            <label style={{ color: "white",padding:'0.5rem', fontSize:'1.5rem',fontFamily:'var(--Lexend)' }} htmlFor="inputfilelabel">
              File Tags
            </label>
            <div className={styles.tagList}>
              {this.state.tags.map((tag, index) => {
                return (
                  <Tag key={index} removeTag={(tag) => this.removeTag(tag)}>
                    {tag}
                  </Tag>
                );
              })}
            </div>
            <input
              type="text"
              className="form-control"
              id="inputfilelabel"
              aria-describedby="Enter Media Related Tag"
              placeholder="Enter Media Tag"
              onKeyPress={this.onTagKeyPress}
            />
            <small id="emailHelp" className="form-text text-white">
              Enter File Related Tag seperate by Spacebar
            </small>

            <div className={styles.catParent}>
              {all.map((cat, index) => (
                <div
                  className={`badge badge-pill ${styles.cat}`}
                  key={index}
                  onClick={() => {
                    this.setState((preState) => ({
                      tags: [
                        ...preState.tags,
                        `${cat} ${
                          this.state.filetype === "audio"
                            ? " Ringtones"
                            : " Wallpaper"
                        }`,
                      ],
                    }));
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <Progress percentage={this.state.progress} />

         {this.state.message && <Message
            ref={this.messageRef}
            message={this.state.message}
            success={this.state.success}
          />}

          <input
            type="button"
            onClick={this.onHandleSubmit}
            value="Upload"
            className={`btn btn-primary m-1 btn-submit ${styles.btnSubmit}`}
          />
        </form>
        <hr className="divider mt-5" />
      </div>
    );
  }
}

const Tag = (props) => {
  return (
    <div
      className={`badge badge-pill badge-success ${styles.tag}`}
      onClick={() => props.removeTag(props.children)}
    >
      <h6 className="m-auto">{props.children}</h6>
      <img
        src="/svg/close.svg"
        alt="close"
        className="ml-2"
        width={20}
        height={20}
      />
    </div>
  );
};

// const mapStateToProps = state => ({})

export default connect(null, null)(FileuploadComponent);
