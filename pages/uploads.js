import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import Profile from "../components/UserProfile/profile";
const FileuploadComponent = dynamic(
  () => import("../components/file-upload/fileupload.component"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);
// import FileuploadComponent from '../components/file-upload/fileupload.component'
import UserGallery from "../components/userGallery";
import { connect } from "react-redux";
import Axios from "axios";
import Layout from "../components/Layout";
import { AxiosInstance } from "../utils/Helper";
import DragNDrop from "../components/dragNDrop";
import { isEmptyObject } from "jquery";
var _ = require("lodash");
class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      fileState: {},
    };
  }

  triggerUpdate = (savedFile) => {
    this.gallary.update(savedFile);
  };

  handleTogglePick = (toggle) => {
    this.setState({
      isUpload: toggle,
    });
  };

  handleGetFile = (file) => {
    console.log("getfile", file);
    this.setState({
      fileState: file,
      isUpload: false,
    });
  };

  handleToggleFileupload = () => {
    this.setState({ fileState: {} });
  };

  render() {
    console.log("props", this.props);
    console.log("up stat", this.state);
    return (
      <Layout title="upload media">
        <Head>
          <script src="https://unpkg.com/wavesurfer.js"></script>
          <script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"></script>

          <script src="/dist/index.js"></script>
        </Head>
        <div className="mx-3  position-relative">
          <Profile user={this.props.user} />
          <UserGallery
            togglePick={(toggle) => this.handleTogglePick(toggle)}
            currentUser={this.props.user}
            ref={(gallary) => (this.gallary = gallary)}
          />
        </div>
        {this.state.isUpload && (
          <DragNDrop
            togglePick={(toggle) => this.handleTogglePick(toggle)}
            getFile={(file) => this.handleGetFile(file)}
          />
        )}
        {!_.isEmpty(this.state.fileState) && (
          <FileuploadComponent
            togglePick={this.handleToggleFileupload}
            currentUser={this.props.user}
            onUpdate={(savedFile) => this.triggerUpdate(savedFile)}
            fileState={this.state.fileState}
          />
        )}
      </Layout>
    );
  }
}

var get_cookies = function (request) {
  var cookies = {};
  request.headers &&
    request.headers.cookie.split(";").forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    });
  return cookies;
};

export async function getServerSideProps({ req, isServer, res, ...ctx }) {
  // Fetch data from external API
  console.log("isserver", ctx);
  console.log("req", req);
  const id_token = get_cookies(req)["id_token"];
  console.log("id_token", id_token);
  try {
    const jwt = id_token;
    let user;
    let authorized = false;
    await AxiosInstance.post(
      `/auth/verifyUser`,
      { jwt },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (response, error) => {
        console.log("res", response.data);
        if (response.data) {
          user = response.data;
          authorized = true;
        } else {
          authorized = false;
        }
      })
      .catch((error) => {
        console.log(error);
        authorized = false;
      });

    if (authorized) {
      return { props: { user: { ...user, jwt } } };
    } else {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
  } catch (error) {
    console.log("request", req);

    console.log("error ", error);
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
}

export default connect((state) => state)(UploadPage);
