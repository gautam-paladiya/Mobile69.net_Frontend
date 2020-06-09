import React, { Component } from 'react'
import { Link } from 'next/link'
import { connect } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar'
import Img from 'react-image'
import MusicSpinner from '../../utils/MusicSpinner'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { play, pause } from '../../redux/music/musicAction'
import { wrapper } from '../../redux/store'
import { AxiosInstance } from '../../utils/Helper'
import Trianglify from 'react-trianglify'

function MusicOverView (props) {
  const { entity } = useSelector(state => state)
  const [audioPercent, setAudioPercent] = useState(0)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const audio = useRef(null)

  // useEffect(
  //   () => () => {
  //     dispatch(pause(props.playId))
  //   },
  //   []
  // )

  const deleteImage = async id => {
    const result = await AxiosInstance.post(
      '/post/delete',
      { id: id },
      {
        headers: {
          'auth-token': props.currentUser.jwt
        }
      }
    )
    console.log(result)
    if (result.status === 200) {
      return id
    }
    console.log(result)
  }

  const onHandleEnded = id => {
    dispatch(pause(id))
  }

  const onPlay = async id => {
    console.log(document.querySelectorAll('audio').length)
    if (document.querySelectorAll('audio').length > 0) {
      for (const audio of document.querySelectorAll('audio')) {
        audio.pause()
      }
    }
    setLoading(true)
    setTimeout(() => {
      audio.current.play()
    }, 2000)
  }

  const onHandlePlay = id => {
    console.log('handle play')
    setLoading(false)
    dispatch(play(id))
  }

  const onPause = id => {
    audio.current.pause()
  }

  const onHandlePause = id => {
    dispatch(pause(id))
  }

  const onHandleTimeUpdate = event => {
    var currentTime = audio.current.currentTime
    var duration = audio.current.duration
    var percent = (currentTime * 100) / duration
    setAudioPercent(percent)
  }

  return (
    <div>
      <div className={`${props.col}  list-item align-self-center`}>
        <audio
          preload='auto'
          ref={audio}
          id='audio'
          src={process.env.PUBLIC_URL + '/music/' + props.item.fileName}
          onEnded={() => onHandleEnded(props.item._id)}
          onPlay={() => onHandlePlay(props.item._id)}
          onPause={() => onHandlePause(props.item._id)}
          onTimeUpdate={onHandleTimeUpdate}
        />

        <div className='card d-flex justify-content-center align-items flex-column'>
          {/* <Img
            id='trianglify'
            className='img-cover card-img'
            src={props.item.pattern}
          /> */}
          <div className='img-cover card-img'>
            <Trianglify />
          </div>
          {loading ? (
            <div className='parent-media progress'>
              <MusicSpinner className='progress' size={20} />
            </div>
          ) : (
            <CircularProgressbar className='progress' value={audioPercent} />
          )}

          <div className='card-img-overlay parent-media'>
            {entity.music.isPlaying &&
            entity.music.itemId === props.item._id ? (
              <img
                alt='pause button'
                src='/img/pause.png'
                onClick={() => onPause(props.item._id)}
                className='img-media'
              />
            ) : (
              <img
                alt='play button'
                src='/img/play.png'
                onClick={() => onPlay(props.item._id)}
                className='img-media'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default wrapper.withRedux(MusicOverView)
