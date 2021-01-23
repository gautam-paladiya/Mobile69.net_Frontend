import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise, EnumChangefreq } from "sitemap";
import { createGzip } from "zlib";
import { AxiosInstance } from "../utils/Helper";
export default function (props) {
  console.log(props);
  return (
    <div>
      Should not be navigated trough via next Link. Use standard a href.
    </div>
  );
}

const addUrls = async (smStream) => {
  const result = await AxiosInstance.post("/post/seoItems");
  if (result.data) {
    for (const postItem of result.data) {
      smStream.write({ url: `/detail/${postItem._id}` });
      // smStream.write({ url: `/find/${postItem.fileOriginName}` });
      // for (const cat of postItem.fileTags) {
      //   smStream.write({ url: `/find/${cat}` });
      // }
    }
  }
  //   const pageSlugs = data.pages.map(page => page.slug)
  //   for (const slug of pageSlugs) {
  //     smStream.write({ url: `/${slug}` })
  //   }
  //   const postSlugs = data.posts.map(page => page.slug)
  //   for (const slug of postSlugs) {
  //     smStream.write({ url: `/p/${slug}` })
  //   }
};

export const getServerSideProps = async ({ res, req }) => {
  let sitemap;
  if (!req || !res) {
    return {
      props: {},
    };
  }
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Content-Encoding", "gzip");

  // If our sitemap is cached, we write the cached sitemap, no query to the CMS.
  if (sitemap) {
    res.write(sitemap);
    res.end();
    return {
      props: {},
    };
  }
  const smStream = new SitemapStream({
    hostname: `${process.env.DOMAIN}/`,
  });
  const pipeline = smStream.pipe(createGzip());

  try {
    smStream.write({ url: "/", changefreq: EnumChangefreq.HOURLY });
    smStream.write({ url: "/ringtones", changefreq: EnumChangefreq.HOURLY });
    smStream.write({ url: "/wallpapers", changefreq: EnumChangefreq.HOURLY });
    smStream.write({ url: "/login", changefreq: EnumChangefreq.HOURLY });
    smStream.write({ url: "/signup", changefreq: EnumChangefreq.HOURLY });
    await addUrls(smStream);

    smStream.end();
    const resp = await streamToPromise(pipeline);

    // cache the sitemap response (cache will be gone on next build.
    // This cache is only useful if your content is static, and you must build the next app on every content change in the cms
    sitemap = resp;

    res.write(resp);
    res.end();
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.write("Could not generate sitemap.");
    res.end();
  }

  return {
    props: {},
  };
};
