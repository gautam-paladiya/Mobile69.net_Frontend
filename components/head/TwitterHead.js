import React, { Component } from "react";

export default function (props) {
  return (
    <React.Fragment>
      <meta
        property="twitter:card"
        content={`${process.env.DOMAIN}/original.png`}
      />
      <meta property="twitter:url" content={`${process.env.DOMAIN}`} />
      <meta
        property="twitter:title"
        content="Free download mobile Ringtones and wallpapers"
      />
      <meta
        property="twitter:description"
        content="Download free Latest Ringtones and HD, mobile,  wallaper  Free on mobile69.net"
      />
      <meta
        property="twitter:image"
        content={`${process.env.PUBLIC_URL}/resize/${props.fileName}`}
      />
    </React.Fragment>
  );
}
