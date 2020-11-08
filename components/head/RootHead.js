import React, { Component, Fragment } from "react";

export default function (props) {
  return (
    <React.Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{props.title}</title>
      <meta
        name="title"
        content="Free ringtones, wallpapers and backgrounds for your cell phone | Mobile69"
      />
      <meta
        name="description"
        content={`Download free Wallpapers, Ringtones and Videos using ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
      />
      <meta property="image" content={`${process.env.DOMAIN}/original.png`} />

      <meta property="url" content={`${process.env.DOMAIN}/original.png`} />
    </React.Fragment>
  );
}
