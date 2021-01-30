import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { useDateFnsLocale } from 'utils/hooks'

import { NavBar } from 'farmApp/components'

import { routes, ROUTE_MAP } from './routes'
import { RecursiveRouter } from 'utils/route'


const MainContent = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    `}
`

/*
     
    > div:nth-child(2) {
      display: flex;
      height: calc(100% - ${height}px + ${theme.custom.pagePadding}px);

    }
*/
// TODO: +2px because 64-8 looks not enough
const ContentSpacer = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
      height: calc(${height}px - ${theme.custom.pagePadding}px);
      display: flex;
      align-items: center;
    `}
`

class FarmApp extends React.Component {

  componentDidMount() {
    console.debug("farmApp - mount")
  }

  render() {
    return (
      <>
      <NavBar />
      <MainContent>
        <RecursiveRouter routes={routes} routeMap={ROUTE_MAP} />
      </MainContent> 
    </>
    )
  }
}

export default FarmApp
/*
export default (props) => {

  useEffect(() => {
    console.debug("farmApp - mount")
    return () => {
      console.debug("farmApp - un-mount")
    }
  })

  return (
    <>
      <NavBar />
      <MainContent>
        <RecursiveRouter routes={routes} routeMap={ROUTE_MAP} />
      </MainContent> 
    </>
  )
}
  */
/*
<NavBar
        pageTitle={pageTitle}
        appBarRef={appBarRef}
        appTabRef={appBarTabsRef}
        appBarBackButtonRef={appBarBackButtonRef}
    />
  <MainContent height={height}>
    <ContentSpacer height={height}/>
    <RecursiveRouter routes={routes} routeMap={ROUTE_MAP} />
  </MainContent> 
*/