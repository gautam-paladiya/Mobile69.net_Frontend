import React from "react";
import Layout from "../../../components/Layout";
import Navigation from "../../../components/navigation";
import ItemOverViewComponent from "../../../components/itemoverview";
import { connect } from "react-redux";
import { AxiosInstance } from "../../../utils/Helper";

import Head from "next/head";

class DetailPage extends React.Component {
  render() {
    console.log("DetailPage", this.props);
    const { post, pageFound } = this.props;
    return (
      <Layout title={post.fileOriginName}>
        <Head>
          <meta
            name="title"
            content="Free download mobile Ringtones and wallpapers"
          />
          <meta
            name="description"
            content={`Search free  wallpapers, ringtones and notifications on ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
          />

          <meta
            property="og:url"
            content={`${process.env.DOMAIN}/detail/${post._id}`}
          />
          <meta property="og:title" content={post.fileOriginName} />
          <meta
            property="og:description"
            content="Download free Latest Ringtones and HD, mobile,  wallaper  Free on Mobile69. billion s of popular wallpaper and ringtones on mobile69 personalize your phone to suit you Browse our Content for free :)"
          />
          <meta
            property="og:image"
            content={
              post.types === "image"
                ? `${process.env.PUBLIC_URL}/resize/${post.fileName}`
                : `${process.env.DOMAIN}/original.png}`
            }
          />
          <meta
            property="og:image:secure_url"
            content={
              post.types === "image"
                ? `${process.env.PUBLIC_URL}/resize/${post.fileName}`
                : `${process.env.DOMAIN}/original.png}`
            }
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:site_name" content={process.env.NAME_SPACE} />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
          <meta property="og:image:alt" content={process.env.DOMAIN} />
          <meta property="og:type" content="website" />
        </Head>
        <div className=".homepage">
          <Navigation />
          <ItemOverViewComponent
            id={post._id}
            item={post}
            pageFound={pageFound}
          />
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  console.log("getInitialProps detail ", context.query);
  const result = await AxiosInstance.post(`/post/getpost`, {
    itemId: context.query.id,
  });
  console.log(result);
  if (result && result.data.status == 200) {
    return {
      props: {
        post: result.data.post,
        pageFound: true,
      },
    };
  } else {
    return {
      props: {
        post: "",
        pageFound: false,
      },
    };
  }
}
export default connect((state) => state)(DetailPage);
