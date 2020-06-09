import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import { connect } from 'react-redux'
import Navigation from '../components/navigation'
import { getDataAction } from '../redux/entities/entityAction'
import WallERing from '../components/directory/wallEring'
import { wrapper } from '../redux/store'

class Ringtones extends React.Component {
  render () {
    return (
      <Layout>
        <div className='.homepage'>
          <Navigation />
          <WallERing />
        </div>
      </Layout>
    )
  }
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, req, res, ...etc }) => {
    await store.dispatch(
      getDataAction({
        navigation: 'ringtones',
        isInitial: true
      })
    )
  }
)

export default connect(state=>state)(Ringtones)
