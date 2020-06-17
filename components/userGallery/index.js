import React, { Component } from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import { Spinner } from 'react-bootstrap'
const ImageItem = dynamic(() => import('../imageItem'), {
  ssr: false,
  loading: () => <Spinner animation='grow' />
})
const MusicItem = dynamic(() => import('../musicItem'), {
  ssr: false,
  loading: () => <Spinner animation='grow' />
})

//import ImageItem from '../imageItem'
// import MusicItem from '../musicItem'
import { AxiosInstance } from '../../utils/Helper'
class UserGallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      files: [],
      pageNum: 1,
      isLast: false,
      isProgress: false
    }
  }

  fetchUserGallery = () => {
    this.setState({ isProgress: true })
    AxiosInstance.post(
      '/post/byuser',
      { pageNum: this.state.pageNum },
      {
        headers: {
          'auth-token': this.props.currentUser.jwt
        }
      }
    )
      .then((result, error) => {
        console.log('error ', error)
        console.log('result ', result)
        if (result.status == 200 && result.data.files) {
          this.setState(prevState => ({
            files: [...this.state.files, ...result.data.files],
            isLast: result.data.isLast,
            isProgress: false
          }))
        } else {
          this.setState({ error: result.data.message, isProgress: false })
        }
      })
      .catch(error => {
        this.setState({ error: error, isProgress: false })
        console.log('errors ', error)
      })
  }

  componentDidMount () {
    this.setState({ files: [] }, newState => {
      this.fetchUserGallery()
    })
  }

  update (savedFile) {
    this.setState({ files: [savedFile, ...this.state.files] })
  }

  updateGallery = id => {
    console.log('update gallery', id)
    this.setState({ files: this.state.files.filter(file => file._id !== id) })
  }

  loadMore = () => {
    this.setState({ pageNum: this.state.pageNum + 1 }, () => {
      this.fetchUserGallery()
    })
  }

  render () {
    return (
      <div className='d-flex flex-column align-items-center'>
        <div className='gallery-list row '>
          {this.state.files.length > 0 &&
            this.state.files.map((item, index) => {
              switch (item.types) {
                case 'image':
                  return (
                    <ImageItem
                      currentUser={this.props.currentUser}
                      key={index}
                      item={item}
                      isActive={false}
                      delete={true}
                      name={true}
                      col='col-md-3 col-6'
                      updateGallery={id => this.updateGallery(id)}
                      download={true}
                    />
                  )
                case 'music':
                  return (
                    <MusicItem
                      currentUser={this.props.currentUser}
                      key={index}
                      item={item}
                      isActive={false}
                      delete={true}
                      name={true}
                      col='col-md-3 col-6'
                      updateGallery={id => this.updateGallery(id)}
                      download={true}
                    />
                  )
                default:
                  return null
              }
            })}
        </div>
        {!this.state.isLast ? (
          <button
            id='showmore'
            type='button'
            // ref={this.showMoreRef}
            className='btn btn-primary justify-content-center w-auto px-2 m-2 btn-loading'
            variant='contained'
            color='primary'
            onClick={this.loadMore}
          >
            {!this.state.isProgress ? (
              ' Show More'
            ) : (
              <div>
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>{' '}
                Loading...
              </div>
            )}
          </button>
        ) : (
          <div className='alert alert-success' role='alert'>
            Yay! You have seen it all
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  UserGallery
)
