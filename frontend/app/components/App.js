import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';

import { NavBar, ProgressBar } from 'components'
import { LanguageProvider, ModalProvider } from 'site/components'
import { SITE_NAME } from 'config'
import Routes from 'routes'

const AppLayout = () => (
  <div>
    <Helmet titleTemplate={`%s - ${SITE_NAME}`}
            defaultTitle={SITE_NAME}
    />
    <ProgressBar />
    <main className="app-container">
      <ModalProvider />
      <NavBar />
      <Routes />
    </main>
  </div>
)

export default (props) => {
  console.log("App props: ", props)
  return (
    <StylesProvider injectFirst>
        <Provider store={props.store}>
          <LanguageProvider messages={props.messages}>
            <ConnectedRouter history={props.history}>      
              <SnackbarProvider maxSnack={3}>
                <AppLayout />
              </SnackbarProvider>
            </ConnectedRouter>
          </LanguageProvider>
        </Provider>
      </StylesProvider>
  )
}
