import React from "react";
import LoginComponent from "../components/login";
import { connect } from "react-redux";
import Head from "next/head";
class Login extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Login</title>
          <meta name="title" content={`${process.env.NAME_SPACE} Login`} />
          <meta
            name="description"
            content={`By login Uploads Unlimited wallpapers, ringtones and notifications on ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
          />
        </Head>
        <LoginComponent />
      </div>
    );
  }
}

export default connect((state) => state)(Login);
