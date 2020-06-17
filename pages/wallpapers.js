import React from 'react'

import Layout from '../components/Layout'
import { connect } from 'react-redux'
import Navigation from '../components/navigation'
import { getDataAction } from '../redux/entities/entityAction'
import WallERing from '../components/directory/wallEring'
import { wrapper } from '../redux/store'

class Wallpaper extends React.Component {
  render () {
    return (
      <Layout canonical='wallpapers'>
        <div className='.homepage'>
          <Navigation />
          <WallERing />
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    await store.dispatch(
      getDataAction({
        navigation: 'wallpaper',
        isInitial: true
      })
    )
  }
)

export default connect(state => state)(Wallpaper)
