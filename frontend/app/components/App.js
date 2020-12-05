import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from 'themes'

import { NavBar, ProgressBar } from 'components'
import Notification from 'components/Notification'
import { LanguageProvider, ModalProvider } from 'site/components'
import { SITE_NAME } from 'config'
import Routes, { routes } from 'routes'

const FullSizeDiv = styled.div`
  height: 100%;
  width: 100%;
`

const Flex = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
`

const MainContent = styled.div`
  ${({ theme }) => `
    height: 100%;
    width: 100%;
    > div:nth-child(2) {
      display: flex;
      height: calc(100% - ${theme.custom.topSpacingHeight}px + ${theme.custom.pagePadding}px);
    }
  `}
`

const ContentSpacer = styled.div`
  ${({ theme }) => `
    height: calc(${theme.custom.topSpacingHeight}px - ${theme.custom.pagePadding}px);
    display: flex;
    align-items: center;
  `}
`


const AppLayout = () => (
  <FullSizeDiv>
    <Helmet titleTemplate={`%s - ${SITE_NAME}`}
            defaultTitle={SITE_NAME}
    />
    <ProgressBar />
    <Flex>
      <ModalProvider />
      <Notification />
      <NavBar />
      <MainContent>
        <ContentSpacer />
        <Routes routes={routes}/>
      </MainContent> 
    </Flex>
  </FullSizeDiv>
)

export default (props) => {
  console.log("defaultTheme: ", defaultTheme)
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
