import React, { useEffect } from "react";

import Layout from "../../../components/Layout";
import Navigation from "../../../components/navigation";
import { findDataAction } from "../../../redux/entities/entityAction";
import WallERing from "../../../components/Directory";

import { wrapper } from "../../../redux/store";
import { connect } from "react-redux";
import Head from "next/head";

class Find extends React.Component {
  render() {
    return (
      <Layout>
        <Head>
          <meta
            name="title"
            content={`${this.props.searchTerm} Ringtones and wallpapers`}
          />
          <meta
            name="description"
            content="Find and free download mobile Ringtones and wallpapers"
          />
        </Head>
        <div className=".homepage">
          <Navigation />
          <h5 className="m-3 font-weight-bold text-muted">
            {this.props.searchTerm} Ringtones and Wallpaper
          </h5>
          <WallERing />
        </div>
      </Layout>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, query, ...etc }) => {
    console.log("req", query);

    await store.dispatch(
      findDataAction({
        searchTerm: query.search,
        isInitial: true,
      })
    );
    return { props: { searchTerm: query.search } };
  }
);

export default connect((state) => state)(Find);
