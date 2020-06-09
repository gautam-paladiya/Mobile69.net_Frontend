import React, { Component } from 'react'
import Page404 from '../page404/index'
import { AxiosInstance } from '../../utils/Helper'
import { connect } from 'react-redux'
import SharePopup from '../sharePopUp'
import Loading from '../loading'
import ImageOverView from '../imageoverview'
import TrianglifyGenerate from '../../utils/Trianglify'
import dynamic from 'next/dynamic'
import { CircleLoader } from 'react-spinners'
const MusicOverView = dynamic(() => import('../musicoverview'), {
  ssr: false,
  loading: () => <div>Loading....</div>
})

// import MusicOverView from '../musicoverview'
import download from '../../utils/Downloads'
import Link from 'next/link'

class ItemOverViewComponent extends Component {
  constructor (props) {
    super(props)
    console.log('ItemOverViewComponent', props)
    this.state = {
      fileName: '',
      pageFound: props.pageFound,
      post: props.item,
      sharePopup: false,
      isZoom: false
    }
    this.myRef = React.createRef()
  }

  componentDidMount () {
    console.log(this.props.location)
    // this.fetchPost()
  }

  // fetchPost = async () => {
  //   const result = await AxiosInstance.post('/post/getpost', {
  //     itemId: this.props.id
  //   })
  //   console.log('file ', result)

  //   if (result) {
  //     if (result.data.status == 200) {
  //       // if (result.data.post.types === 'music') {
  //       //   this.setState({
  //       //     post: {
  //       //       ...result.data.post,
  //       //       pattern: TrianglifyGenerate()
  //       //         .canvas()
  //       //         .toDataURL()
  //       //     }
  //       //   })

  //       //   return
  //       // }
  //       this.setState({
  //         post: result.data.post
  //       })
  //     } else {
  //       this.setState({ pageFound: false })
  //     }
  //   }
  // }

  plusDownload = async event => {
    const result = await AxiosInstance.post('/post/plusDownload', {
      postId: this.state.post._id
    })
    if (result) {
      if (result.data.status == 200) {
      }
    }
    const shareData = {
      title: `${process.env.NAME_SPACE}`,
      text:
        'Download free Latest Ringtones and HD, mobile, wallaper Free on Mobile69.',
      url: `${process.env.PUBLIC_URL}/detail/${this.state.post.fileName}`
    }
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log('Thanks for sharing!')
        })
        .catch(console.error)
    } else {
      // shareDialog.classList.add('is-open');
    }
  }

  downloadImage = () => {}

  searchTag (tag) {
    this.props.history.push(`/find/${tag}`)
  }

  toggleShare = () => {
    this.setState({ sharePopup: !this.state.sharePopup })
  }

  hide = () => {
    this.setState({ sharePopup: false })
  }

  toggleZoom = () => {
    this.setState({ isZoom: !this.state.isZoom })
  }

  render () {
    return this.state.pageFound ? (
      this.state.post ? (
        <div className='parent '>
          <div>
            {!this.state.isZoom && (
              <div className='header-parent pt-2 d-flex flex-column align-items-md-start flex-md-row '>
                <div className='left col-12 col-md-10'>
                  <div className='d-flex'>
                    <img src='/img/user.png' className='img-profile' />
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center'>
                        <h5 className='file-text'>
                          {this.state.post.fileOriginName}
                        </h5>
                        <h5 className='file-text text-primary '>
                          <img
                            src='/svg/download.svg'
                            className='ml-4 mr-2 align-self-center text-primary'
                          />
                        </h5>

                        <h5 className='file-text text-primary '>
                          {this.state.post.downloads}
                        </h5>
                      </div>
                      <span className='user-text text-muted'>
                        by {this.state.post.userName}
                      </span>
                    </div>
                  </div>
                  <div className='tag-row'>
                    {this.state.post.fileTags.map((tag, index) => {
                      return (
                        <Link href={`/find/${tag}`} key={index}>
                          <span className='badge badge-pill badge-info tagBadge'>
                            {tag}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className='col-12 mt-4 col-md-2 d-flex justify-content-md-end  justify-content-center'>
                  <img
                    src='/svg/share.svg'
                    type='button'
                    className='btn btn-primary btn-md mr-2 text-white'
                    onClick={this.toggleShare}
                  />

                  <button
                    // href={`${process.env.PUBLIC_URL}/${this.state.post.types}/${this.state.post.fileName}`}
                    // download={`${this.state.post.fileOriginName}`}
                    style={{ textDecoration: 'none' }}
                    className=' btn btn-primary btn-md'
                    onClick={() => {
                      setTimeout(() => {
                        download(
                          `${process.env.PUBLIC_URL}/${this.state.post.types}/${this.state.post.fileName}`,
                          `${this.state.post.fileOriginName}`
                        )
                        this.plusDownload()
                      }, 1000)
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className='media'>
            {this.state.post.types == 'image' ? (
              <ImageOverView
                item={this.state.post}
                isZoom={this.state.isZoom}
                toggleZoom={this.toggleZoom}
              />
            ) : (
              <MusicOverView
                item={this.state.post}
                isActive={false}
                col='col-md-12 col-12'
              />
            )}
          </div>
          {this.state.sharePopup && (
            <SharePopup
              shareLink={`${window.location.href}`}
              hide={this.hide}
              img={
                this.state.post.types == 'image'
                  ? `${process.env.PUBLIC_URL}/detail/${this.state.post.fileName}`
                  : `${process.env.PUBLIC_URL}/original.png`
              }
            />
          )}
        </div>
      ) : (
        <Loading />
      )
    ) : (
      <Page404 />
    )
  }
}

export default connect(state => state)(ItemOverViewComponent)
