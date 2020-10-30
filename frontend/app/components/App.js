import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';

import { NavBar, ProgressBar } from 'components'
import { SITE_NAME } from 'config'
import Routes from 'routes'


const AppLayout = () => (
  <div>
    <Helmet titleTemplate={`%s - ${SITE_NAME}`}
            defaultTitle={SITE_NAME}
    />
    <ProgressBar />
    <main className="app-container">
      <NavBar />
      <Routes />
    </main>
  </div>
)

export default (props) => (
  <StylesProvider injectFirst>
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>      
          <AppLayout />
      </ConnectedRouter>
    </Provider>
  </StylesProvider>
)
