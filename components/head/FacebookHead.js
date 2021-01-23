import React, { Component } from "react";

export default function (props) {
  return (
    <React.Fragment>
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.DOMAIN}`} />
      <meta
        property="og:title"
        content="Free download mobile Ringtones and wallpapers"
      />
      <meta
        property="og:description"
        content={`Search free  wallpapers, ringtones and notifications on ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
      />
      <meta
        property="og:image"
        content={`${process.env.PUBLIC_URL}/images/${props.fileName}`}
      />
      <meta
        property="og:image:secure"
        content={`${process.env.PUBLIC_URL}/resize/${props.fileName}`}
      />
    </React.Fragment>
  );
}
