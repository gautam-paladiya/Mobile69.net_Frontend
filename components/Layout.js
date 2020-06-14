import Link from 'next/link'
import HeaderComponent from './header'
import dynamic from 'next/dynamic'
// const HeaderComponent = dynamic(() => import('./header'), {
//   ssr: false
// })
import Head from 'next/head'
export default function ({ children, title = `${process.env.NAME_SPACE}` }) {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <title>{title}</title>
        <meta
          name='title'
          content='Free download mobile Ringtones and wallpapers'
        />
        <meta
          name='description'
          content='Download free Latest Ringtones and HD, mobile,  wallaper  Free on Mobile69.in'
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${process.env.DOMAIN}`} />
        <meta
          property='og:title'
          content='Free download mobile Ringtones and wallpapers'
        />
        <meta
          property='og:description'
          content='Download free Latest Ringtones and HD, mobile,  wallaper  Free on Mobile69.in'
        />
        <meta
          property='og:image'
          content={`${process.env.DOMAIN}/original.png`}
        />

        {/* <!-- Twitter --> */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={`${process.env.DOMAIN}`} />
        <meta
          property='twitter:title'
          content='Free download mobile Ringtones and wallpapers'
        />
        <meta
          property='twitter:description'
          content='Download free Latest Ringtones and HD, mobile,  wallaper  Free on Mobile69.in'
        />
        <meta
          property='twitter:image'
          content={`${process.env.DOMAIN}/original.png`}
        />

        <meta
          property='image'
          content={`${process.env.DOMAIN}/original.png`}
        />

        <meta property='url' content={`${process.env.DOMAIN}/original.png`} />
       
      </Head>
      <HeaderComponent />
      {children}
    </div>
  )
}
