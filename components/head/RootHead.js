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

      <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />

      <meta name="title" content={`${props.title} by  Mobile69.net`} />

      <meta
        name="description"
        content={`Download free Wallpapers, Ringtones and Videos using ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
      />
      {props.fileTags && (
        <meta
          name="description"
          content={props.fileTags.map((tag) => {
            return ` ${tag} By Mobile69.net `;
          })}
        />
      )}
      <meta property="image" content={`/original.png`} />

      <meta property="url" content={`/original.png`} />
      {props.canonical && (
        <link
          rel="canonical"
          href={`https://mobile69.net/${props.canonical}`}
          data-rh="true"
        />
      )}

      <meta name="application-name" content={process.env.NAME_SPACE} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content={process.env.NAME_SPACE}
      />

      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icon-192x192.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://mobile69.net" />
      <meta name="twitter:title" content={process.env.NAME_SPACE} />
      {/* <meta
        name="twitter:description"
        content={props.fileTags.map((tag) => {
          return ` ${tag} By Mobile69.net `;
        })}
      /> */}
      <meta name="twitter:image" content={`/original.png`} />
      <meta name="twitter:creator" content="@GautamPaladiya" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={process.env.NAME_SPACE} />
      {/* <meta
        property="og:description"
        content={props.fileTags.map((tag) => {
          return ` ${tag} By Mobile69.net `;
        })}
      /> */}
      <meta property="og:site_name" content={process.env.NAME_SPACE} />
      <meta property="og:url" content="https://mobile69.net" />
      <meta property="og:image" content={`/original.png`} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </React.Fragment>
  );
}
