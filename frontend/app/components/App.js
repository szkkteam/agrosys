import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';

import { NavBar, ProgressBar, SideMenu } from 'components'
import { SITE_NAME, COPYRIGHT } from 'config'
import Routes from 'routes'


const AppLayout = () => (
  <div>
    <Helmet titleTemplate={`%s - ${SITE_NAME}`}
            defaultTitle={SITE_NAME}
    />
    <ProgressBar />
    <main className="page-container page-panels">
      <SideMenu />
      <Routes />
    </main>
    <footer className="center">
       Copyright {new Date().getFullYear()} {COPYRIGHT}
    </footer>
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
