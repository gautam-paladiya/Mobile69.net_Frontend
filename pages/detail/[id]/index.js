import React from "react";
import Layout from "../../../components/Layout";
import Navigation from "../../../components/navigation";
import ItemOverView from "../../../components/itemoverview";
import { connect } from "react-redux";
import { AxiosInstance } from "../../../utils/Helper";

import Head from "next/head";
import FacebookHead from "../../../components/head/FacebookHead";
import TwitterHead from "../../../components/head/TwitterHead";
import RootHead from "../../../components/head/RootHead";

class DetailPage extends React.Component {
  render() {
    console.log("DetailPage", this.props);
    const { post, pageFound } = this.props;
    console.log("DetailPage", post.types === "image");

    return (
      <Layout title={post.fileOriginName}>
        <Head>
          {RootHead({ title: post.fileOriginName })}
          {FacebookHead({ fileName: post.fileName })}
          {TwitterHead({ fileName: post.fileName })}
        </Head>
        <div className=".homepage">
          <Navigation />
          <ItemOverView id={post._id} item={post} pageFound={pageFound} />
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
