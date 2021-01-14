import React, { useState, useRef, useLayoutEffect } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from 'themes'

import { NavBar, ProgressBar } from 'components'
import Notification from 'components/Notification'
import { LanguageProvider, ModalProvider } from 'site/components'
import { SITE_NAME } from 'config'
import Routes, { routes } from 'routes'



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


const MainContent = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
    height: 100%;
    width: 100%;
    > div:nth-child(2) {
      display: flex;
      height: calc(100% - ${height}px + ${theme.custom.pagePadding}px);

    }
    `}
`

/*
      > div {
        height: 100%;
        width: 100%;
      }
*/
// TODO: +2px because 64-8 looks not enough
const ContentSpacer = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
      height: calc(${height}px - ${theme.custom.pagePadding}px + 2px);
      display: flex;
      align-items: center;
    `}
`


const AppLayout = () => {

  const appBarRef = useRef(null)
  const appBarTabsRef = useRef(null)

  const [height, setHeight] = useState(64)  
  const [pageTitle, setPageTitle] = useState(null)

  useLayoutEffect(() => {
    if (appBarRef?.current) {
      const { clientHeight } = appBarRef.current
      setHeight(clientHeight)
      console.debug(clientHeight)
    }
  }, [appBarRef])

  const contextObject = {
    appBarTabsRef,
    setPageTitle, 
    appBarHeight: height,
  }

  return (
    <FullSizeDiv>
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
        <NavBar
          pageTitle={pageTitle}
          appBarRef={appBarRef}
          appTabRef={appBarTabsRef}
        />
        <MainContent height={height}>
          <ContentSpacer height={height}/>
          <Routes routes={routes}/>
        </MainContent> 
      </Flex>
      </AppContext.Provider>
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
