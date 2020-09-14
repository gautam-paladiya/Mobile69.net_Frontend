import Dropzone from "react-dropzone";

class DragNDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filetype: "",
      file: "",
      filename: "",
      fileOriginName: "",
      url: "",
      message: "",
      success: true,
    };
  }

  render() {
    return (
      <div className="drag-parent">
        <img
          src="/svg/close.svg"
          width={40}
          height={40}
          className="close-btn"
          onClick={() => this.props.togglePick(false)}
        />
        <Dropzone
          onDrop={(acceptedFiles) => {
            const file = acceptedFiles[0];
            console.log("ondrop", file);
            var reader = new FileReader();

            reader.onloadend = function (event) {
              console.log("reader.onloadend", file);
              // filename is in file.name
            };
            reader.readAsArrayBuffer(file);
            this.setState({
              filetype: "",
              file: "",
              filename: "",
              fileOriginName: "",
              url: "",
              message: "",
              success: true,
            });
            if (!file) {
              this.props.togglePick(false);
              this.props.getFile(this.state);
              return;
            }
            const fileSize = file.size / (1024 * 1024);
            let fileType = file.name.split(".").pop();
            const url = URL.createObjectURL(file);

            if (fileSize > process.env.MAX_FILE_SIZE) {
              this.setState({
                success: false,
                message: `Select max file size ${process.env.MAX_FILE_SIZE} MB`,
              });

              return;
            }
            console.log(file.type.toLowerCase());
            if (file.type.toLowerCase().indexOf("image") > -1) {
              fileType = "image";
            } else if (file.type.toLowerCase().indexOf("audio") > -1) {
              fileType = "music";
            } else {
              fileType = undefined;
              this.setState({ message: "Select valid media file" });
              this.setState({ success: false });
              return;
            }

            this.setState({
              filetype: file.type.split("/")[0],
              file: file,
              filename: file.name,
              fileOriginName: file.name.split(".")[0],
              url: url,
              message: "",
            });
            this.props.getFile(this.state);
            this.props.togglePick(false);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-drop ">
                  {this.state.message && (
                    <h1 style={{ color: "#F47B66" }}>{this.state.message}</h1>
                  )}
                  <img src="/svg/cloud_upload.svg" width={50} height={50} />
                  <h2 style={{ color: "white" }}>Drag and Drop</h2>
                  <div className="media-icon">
                    <img
                      src="/img/camera.png"
                      style={{ margin: "10px" }}
                      width={60}
                      height={60}
                    />
                    <img
                      src="/img/speaker.png"
                      style={{ margin: "10px" }}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h4 style={{ color: "white" }}>OR CHOOSE FILE</h4>
                  <h6 style={{ color: "white", marginTop: "20px" }}>
                    By selecting 'Upload' you are representing that this item is
                    not obscene and does not otherwise violate mobile69.net's
                    Terms of Service, and that you own all copyrights to this
                    item or have express permission from the copyright owner(s)
                    to upload it. Before uploading, please read our Community
                    Guidelines.
                  </h6>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default DragNDrop;
