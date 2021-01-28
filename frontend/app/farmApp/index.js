import React, { useState, useRef, useLayoutEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { useDateFnsLocale } from 'utils/hooks'

import { NavBar } from 'components'

import { routes, ROUTE_MAP } from './routes'
import { RecursiveRouter } from 'utils/route'


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
      height: calc(${height}px - ${theme.custom.pagePadding}px);
      display: flex;
      align-items: center;
    `}
`


export default (props) => {

  const appBarRef = useRef(null)
  const appBarTabsRef = useRef(null)
  const appBarBackButtonRef = useRef(null)

  const [height, setHeight] = useState(64)  
  const [pageTitle, setPageTitle] = useState(null)

  const { locale } = useDateFnsLocale()

  useLayoutEffect(() => {
    if (appBarRef?.current) {
      const { clientHeight } = appBarRef.current
      setHeight(clientHeight)
      console.debug(clientHeight)
    }
  }, [appBarRef])

  console.debug("Render navbar")

  return (
    <>
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
</>
  )
}
  
/*
<>
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
        </>
*/