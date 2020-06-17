import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { play, pause } from '../../redux/music/musicAction'
import { CircularProgressbar } from 'react-circular-progressbar'
import Img from 'react-image'
import MusicSpinner from '../../utils/MusicSpinner'
import { AxiosInstance } from '../../utils/Helper'
// import Trianglify from 'react-trianglify'
import dynamic from 'next/dynamic'
const Trianglify = dynamic(()=>import('react-trianglify'),{
  ssr:false
})
import pauseIcon from '../../assets/img/pause.png'
import playIcon from '../../assets/img/play.png'

class MusicItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      audioPercent: 0,
      loading: false,
      imgLoading: false
    }
  }

  componentWillUnmount () {
    this.props.dispatch(pause(this.props.playId))
  }

  deleteImage = async id => {
    const result = await AxiosInstance.post(
      `/post/delete`,
      { id: id },
      {
        headers: {
          'auth-token': this.props.currentUser.jwt
        }
      }
    )
    console.log(result)
    if (result.status === 200) {
      return id
    }
    console.log(result)
  }

  onHandleEnded = id => {
    this.props.dispatch(pause(id))
  }
  onPlay = async id => {
    if (document.querySelectorAll('audio').length > 0) {
      for (const audio of document.querySelectorAll('audio')) {
        audio.pause()
      }
    }
    this.setState({ loading: true })
    this.audio.play()
  }

  onHandlePlay = id => {
    console.log('handle play')
    this.setState({ loading: false })
    this.props.dispatch(play(id))
  }

  onPause = id => {
    this.audio.pause()
  }

  onHandlePause = id => {
    this.props.dispatch(pause(id))
  }

  onHandleTimeUpdate = event => {
    var currentTime = this.audio.currentTime
    var duration = this.audio.duration
    var percent = (currentTime * 100) / duration
    this.setState({ audioPercent: percent })
  }

  componentDidMount () {
    // if (!this.props.item.pattern) {
    //   this.setState({
    //     pattern: TrianglifyGenerate()
    //       .canvas()
    //       .toDataURL()
    //   })
    // }
  }

  render () {
    return (
      <div className={`${this.props.col}  list-item align-self-center`}>
        <audio
          preload='auto'
          ref={audio => (this.audio = audio)}
          id='audio'
          src={process.env.PUBLIC_URL + '/music/' + this.props.item.fileName}
          onEnded={() => this.onHandleEnded(this.props.item._id)}
          onPlay={() => this.onHandlePlay(this.props.item._id)}
          onPause={() => this.onHandlePause(this.props.item._id)}
          onTimeUpdate={this.onHandleTimeUpdate}
        />

        <div className='card d-flex justify-content-center align-items flex-column'>
          <Link href='/detail/[id]' as={`/detail/${this.props.item._id}`}>
            <div>
              {/* <Img
                id='trianglify'
                className='img-cover card-img'
                src={
                  this.props.item.pattern
                    ? this.props.item.pattern
                    : this.state.pattern
                }
                onLoad={() => this.setState({ imgLoading: true })}
              /> */}
              <div className='img-cover card-img'>
                <Trianglify />
              </div>

              {this.props.name && (
                <h5 className='card-title'>{this.props.item.fileOriginName}</h5>
              )}
            </div>
          </Link>

          {this.state.loading ? (
            <div className='parent-media progress'>
              <MusicSpinner className='progress' />
            </div>
          ) : (
            <CircularProgressbar
              className='w-5 h-5 progress'
              value={this.state.audioPercent}
            />
          )}

          {this.props.delete && (
            <img
              alt='close'
              className='btn-close'
              src='/svg/close.svg'
              width={25}
              height={25}
              onClick={async () => {
                let deleteId = await this.deleteImage(this.props.item._id)
                this.props.updateGallery(deleteId)
              }}
            />
          )}

          {this.props.download && (
            <div className='download'>
              <h5 className='file-text text-primary '>
                <img
                  alt='Download'
                  src='/svg/download.svg'
                  className='ml-4 mr-2 align-self-center text-primary'
                />
              </h5>

              <h5 className='file-text text-primary '>
                {this.props.item.downloads}
              </h5>
            </div>
          )}
          <div className='card-img-overlay parent-media'>
            {this.props.isPlaying &&
            this.props.playId === this.props.item._id ? (
              <img
                alt='pause'
                src={pauseIcon}
                onClick={() => this.onPause(this.props.item._id)}
                className='img-media'
              />
            ) : (
              <img
                alt='play'
                src={playIcon}
                onClick={() => this.onPlay(this.props.item._id)}
                className='img-media'
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProsp = state => ({
  isPlaying: state.entity.music.isPlaying,
  playId: state.entity.music.itemId
})

export default connect(mapStateToProsp)(MusicItem)
