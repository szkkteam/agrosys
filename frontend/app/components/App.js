import React, { useState, useRef, useLayoutEffect } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, { ThemeProvider } from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { useDateFnsLocale } from 'utils/hooks'
import { ProtectedRoute, AnonymusRoute } from 'utils/route'

import { defaultTheme } from 'themes'

import { NavBar, ProgressBar } from 'components'
import Notification from 'components/Notification'
import { LanguageProvider, ModalProvider } from 'site/components'
import { SITE_NAME } from 'config'

import FarmApp from 'farmApp'
import Security from 'security'


import AppContext from './AppContext'

const FullSizeDiv = styled.div`
  height: 100%;
  width: 100%;
`

const Flex = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
`


const AppLayout = () => {
  const { locale } = useDateFnsLocale()

  const contextObject = {
    appBarBackButtonRef: null,
    appBarTabsRef: null,
    setPageTitle: () => null, 
    appBarHeight: 64,
  }
  /*
              <AnonymusRoute path="/(security)" component={Security} />
            <ProtectedRoute path="*" component={FarmApp}/>
  */

  return (
    <FullSizeDiv>
      <LocalizationProvider dateAdapter={DateFnsAdapter} locale={locale}>
        <AppContext.Provider
                  value={contextObject}
        >
        <Helmet titleTemplate={`%s - ${SITE_NAME}`}
                defaultTitle={SITE_NAME}
        />
        <ProgressBar />
        <Flex>
          <ModalProvider />
          <Notification />
            <Switch>
              <AnonymusRoute path="/(security)" component={Security} />
              <ProtectedRoute path="*" component={FarmApp}/>
            </Switch>

        </Flex>
        </AppContext.Provider>
      </LocalizationProvider>
    </FullSizeDiv>
  )
}
  
export default (props) => {
  console.debug("defaultTheme: ", defaultTheme)
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={defaultTheme}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Provider store={props.store}>
            <LanguageProvider messages={props.messages}>
              <ConnectedRouter history={props.history}>    
                <SnackbarProvider maxSnack={3}>
                  <AppLayout />
                </SnackbarProvider>
              </ConnectedRouter>
            </LanguageProvider>
          </Provider>
        </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
  )
}
