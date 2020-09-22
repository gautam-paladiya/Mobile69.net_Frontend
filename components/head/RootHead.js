import React, { Component, Fragment } from "react";

export default class RootHead extends Component {
  render() {
    return (
      <React.Fragment>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{`${process.env.NAME_SPACE}`}</title>
        <meta
          name="title"
          content="Free download mobile Ringtones and wallpapers"
        />
        <meta
          name="description"
          content={`Search free  wallpapers, ringtones and notifications on ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
        />
        <meta property="image" content={`${process.env.DOMAIN}/original.png`} />

        <meta property="url" content={`${process.env.DOMAIN}/original.png`} />
      </React.Fragment>
    );
  }
}
