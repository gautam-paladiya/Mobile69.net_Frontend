// import TrianglifyGenerate from '../Util/Trianglify'
import { RingLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'
import dynamic from 'next/dynamic'
import { Spinner } from 'react-bootstrap'
const ImageItem = dynamic(() => import('../imageItem'), {
  ssr: false,
  loading: () => <Spinner animation='grow' />
})
// import ImageItem from '../imageItem'
// import MusicItem from '../musicItem'
const MusicItem = dynamic(() => import('../musicItem'), {
  ssr: false,
  loading: () => <Spinner />
})

import { useDispatch, useSelector } from 'react-redux'
import {
  getDataAction,
  findDataAction
} from '../../redux/entities/entityAction'
import Page404 from '../page404'
import { RiseLoader } from 'react-spinners'

export default function (props) {
  const dispatch = useDispatch()
  const { entity } = useSelector(state => state)

  const loadMore = () => {
    console.log('entity.isLast', entity.isLast)
    if (!entity.isLast) {
      if (entity.navigation === 'find') {
        dispatch(
          findDataAction({
            searchTerm: entity.searchTerm,
            id: entity.id
          })
        )
      } else {
        dispatch(
          getDataAction({
            id: entity.items[entity.items.length - 1]._id,
            navigation: entity.navigation
          })
        )
      }
    }
  }

  return (
    <div>
      {entity.error ? (
        <Page404 title='No matching itmes found' description='Item you are looking for does not found please try again later'/>
      ) : (
        <div className='parent-dir'>
          {entity.isProgress && (
            <div className='parent-dir'>
              <RingLoader size={200} color='#4A90E2' />
            </div>
          )}
          {/* <InfiniteScroll
            style={{ width: '95vw' }}
            dataLength={entity.items.length}
            next={loadMore}
            hasMore={!entity.isLast}
            loader={
              <div className='justify-content-center align-items-center align-content-center'>
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>{' '}
                Loading...
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          > */}
          <div className='directory-list'>
            {entity.items.map((item, index) => {
              switch (item.types) {
                case 'image':
                  return (
                    <ImageItem
                      key={index}
                      item={item}
                      isActive={true}
                      name={true}
                      col='col-md-2 col-4'
                    />
                  )
                  break
                case 'music':
                  return (
                    <MusicItem
                      key={index}
                      item={item}
                      isActive={true}
                      name={true}
                      col='col-md-2 col-4'
                    />
                  )

                default:
                  return null
              }
            })}
          </div>
          {!entity.isLast ? (
            <button
              id='showmore'
              type='button'
              // ref={this.showMoreRef}
              className='btn btn-primary w-auto px-2 m-2 btn-loading'
              variant='contained'
              color='primary'
              onClick={loadMore}
            >
              {!entity.isProgress ? (
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
          ):(<div className="alert alert-success" role="alert">Yay! You have seen it all</div>)}
          {/* </InfiniteScroll> */}
        </div>
      )}
    </div>
  )
}
