import React, { useState, useRef, useLayoutEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { routes, ROUTE_MAP } from './routes'
import { RecursiveRouter } from 'utils/route'


const MainContent = styled(({height: dummy = null, ...rest}) => <div {...rest}/> )`
    ${({ theme, height }) => `
    height: 100%;
    width: 100%;
    > div {
      display: flex;
      height: calc(100% + ${theme.custom.pagePadding}px);

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
      //height: calc(${height}px - ${theme.custom.pagePadding}px);
      flex-grow: 1;
      display: flex;
      align-items: center;
    `}
`


export default () => {

  return (
      <>
        <MainContent>
            <RecursiveRouter routes={routes} routeMap={ROUTE_MAP}/>
        </MainContent> 
      </>
  )
}
  