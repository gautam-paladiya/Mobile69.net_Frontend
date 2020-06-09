import Img from 'react-image'
import Link from 'next/link'
import { GridLoader } from 'react-spinners'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { AxiosInstance } from '../../utils/Helper'

const ImageItem = props => {
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
  return (
    <div
      className={`${props.col} list-item align-self-center background`}
      // onClick={() => {
      //   console.log('onclick')
      //   dispatch(
      //     pushAction({ location: { pathname: `/detail/${props.item._id}`,cat:'detail',hash:props.item._id } })
      //   )
      //   history.pushState({}, null, `/detail/${props.item._id}`)

      // }}
    >
      <Link href='/detail/[id]' as={`/detail/${props.item._id}`}>
        <div className='card '>
          <Img
            className='card-img img-cover'
            src={`${process.env.PUBLIC_URL}/${props.item.types}/resize/${props.item.fileName}`}
            // loader={<GridLoader size={20} margin={10} />}
            // unloader={<GridLoader size={20} margin={10} />}
          />
          <div className='card-img-overlay border-0 '>
            {props.name && (
              <h5 className='card-title'>{props.item.fileOriginName}</h5>
            )}
          </div>
        </div>
      </Link>
      {props.delete && (
        <img
          className='btn-close'
          src='/svg/close.svg'
          width={25}
          height={25}
          onClick={async () => {
            let deleteId = await deleteImage(props.item._id)
            props.updateGallery(deleteId)
          }}
        />
      )}
    </div>
  )
}
export default ImageItem
