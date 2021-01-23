import dynamic from 'next/dynamic'

const MultiFileuploadComponent = dynamic(
  () => import('../components/multipleUpload'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)
import UserGallery from '../components/userGallery'
import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '../components/Layout'
import { AxiosInstance } from '../utils/Helper'

class MultiUploadPage extends React.Component {
  triggerUpdate = () => {
    this.gallary.update()
  }

  render () {
    console.log('props', this.props)
    return (
      <Layout title='upload media'>
        <Head>
          <script src='https://unpkg.com/wavesurfer.js'></script>
          <script src='https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'></script>
          <script
            src='/dist/worker.js'
            type='text/js-worker'
            x-audio-encode='true'
          ></script>
          <script src='/dist/index.js'></script>
        </Head>
        <div className='container'>
          <MultiFileuploadComponent
            currentUser={this.props.user}
            onUpdate={this.triggerUpdate.bind(this)}
          />
          <UserGallery
            currentUser={this.props.user}
            ref={gallary => (this.gallary = gallary)}
          />
        </div>
      </Layout>
    )
  }
}

var get_cookies = function (request) {
  var cookies = {}
  request.headers &&
    request.headers.cookie.split(';').forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[parts[1].trim()] = (parts[2] || '').trim()
    })
  return cookies
}

export async function getServerSideProps ({ req, isServer, res, ...ctx }) {
  // Fetch data from external API
  console.log('isserver', ctx)
  console.log('req', req)
  const id_token = get_cookies(req)['id_token']
  console.log('id_token', id_token)
  try {
    const jwt = id_token
    let user
    let authorized = false
    await AxiosInstance.post(
      `/auth/verifyUser`,
      { jwt },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(async (response, error) => {
        console.log('res', response.data)
        if (response.data) {
          user = response.data
          authorized = true
        } else {
          authorized = false
        }
      })
      .catch(error => {
        console.log(error)
        authorized = false
      })

    if (authorized) {
      return { props: { user: { ...user, jwt } } }
    } else {
      res.setHeader('location', '/login')
      res.statusCode = 302
      res.end()
      return { props: {} }
    }
  } catch (error) {
    console.log('request', req)

    console.log('error ', error)
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return { props: {} }
  }
}

export default connect(state => state)(MultiUploadPage)
