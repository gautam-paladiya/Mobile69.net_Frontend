import React from "react";

export default function (props) {
  return (
    <React.Fragment>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes"
      />
      <title>
        {props.title}
        {" by  Mobile69.net"}
      </title>

      <link
            rel="icon"
            href="/favicon.ico"
            type="image/x-icon"
            sizes="16x16"
          />

      <meta
        name="title"
        content={`${props.title} by  Mobile69.net`}
      />

      <meta
        name="description"
        content={`Download free Wallpapers, Ringtones and Videos using ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
      />
      {
        props.fileTags && <meta name='description' content={props.fileTags.map(tag=>{return ` ${tag} By Mobile69.net `})} />

      }
      <meta property="image" content={`/original.png`} />

      <meta property="url" content={`/original.png`} />
      {props.canonical && (
        <link
          rel="canonical"
          href={`https://mobile69.net/${props.canonical}`}
          data-rh="true"
        />
      )}
    </React.Fragment>
  );
}
