import React, { Component } from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import { Spinner } from 'react-bootstrap'
const ImageItem = dynamic(() => import('../imageItem'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})
const MusicItem = dynamic(()=>import('../musicItem'),{
  ssr:false,
  loading:()=><Spinner/>
})

//import ImageItem from '../imageItem'
// import MusicItem from '../musicItem'
import { AxiosInstance } from '../../utils/Helper'
class UserGallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }

  fetchUserGallery = () => {
    AxiosInstance.post(
      '/post/byuser',
      {},
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
            files: result.data.files
          }))
        } else {
          this.setState({ error: result.data.message })
        }
      })
      .catch(error => {
        this.setState({ error: error })
        console.log('errors ', error)
      })
  }

  componentDidMount () {
    this.setState({ files: [] }, newState => {
      this.fetchUserGallery()
    })
  }

  update () {
    this.fetchUserGallery()
  }

  updateGallery = id => {
    console.log('update gallery', id)
    this.setState({ files: this.state.files.filter(file => file._id !== id) })
  }

  render () {
    return (
      <div>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  UserGallery
)
