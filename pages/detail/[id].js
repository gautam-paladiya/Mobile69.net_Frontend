import React from "react";
import Layout from "../../components/Layout";
import Navigation from "../../components/navigation";
import ItemOverView from "../../components/itemoverview";
import { connect } from "react-redux";
import { AxiosInstance } from "../../utils/Helper";

import Head from "next/head";
import FacebookHead from "../../components/head/FacebookHead";
import TwitterHead from "../../components/head/TwitterHead";
import RootHead from "../../components/head/RootHead";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("DetailPage");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("nextState", nextState);
  //   console.log("nextProps", nextProps);
  //   if (this.props.post._id == nextProps.post._id) {
  //     console.log("return");
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { post, pageFound } = this.props;

    return (
      <Layout title={post.fileOriginName}>
        <Head>
          {RootHead({
            title: post.fileOriginName,
            canonical: `detail/${post._id}`,
            fileTags:post.fileTags
          })}
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

// export async function getServerSideProps(context) {
//   console.log("getInitialProps detail ", context.query);
//   const result = await AxiosInstance.post(`/post/getpost`, {
//     itemId: context.query.id,
//   });
//   if (result && result.data.status == 200) {
//     // console.log(result);

//     return {
//       props: {
//         post: result.data.post,
//         pageFound: true,
//       },
//     };
//   } else {
//     return {
//       props: {
//         post: "",
//         pageFound: false,
//       },
//     };
//   }
// }

export async function getStaticProps(context) {
  // console.log("getInitialProps detail ", context);
  const result = await AxiosInstance.post(`/post/getpost`, {
    itemId: context.params.id,
  });
  if (result && result.data.status == 200) {
    console.log(result);

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



export async function getStaticPaths(){
  const result = await AxiosInstance.post(`/post/getId`);
 
  const paths = await result.data.map((post)=>({params:{id:post._id}}))

  return {paths,fallback:false}
}

export default connect((state) => state)(DetailPage);
