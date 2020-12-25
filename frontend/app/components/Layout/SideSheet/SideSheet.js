import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSplitComponents } from 'utils/hooks'

import {
    Paper,
    Drawer,
} from '@material-ui/core';

const detailWidth = 450

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`


//const MainContainer = styled(({open: dummy = null, ...props}) => <div {...props} />)`
const MainContainer = styled.div`
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    display: flex;
    height: 100%;
    width: 100%;
    ${({ theme, open }) => open === true
    ? `
        width: calc(100% - ${detailWidth}px);
        padding-right: 3px;
    `
    : `
    `
    }
`

const DetailContainer = styled(Paper)`
    ${({ theme, open }) => `
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    width: ${open? `${detailWidth}px`: `0px`};
    flex-shrink: 0;
    `}
`

const SideSheet = ({
    open,
    children,
    ...props
}) => {
    const [mainComponent, detailComponent] = useSplitComponents(children)

    return (
        <Container>
            <MainContainer
                open={open}
            >
                {_.isFunction(mainComponent)? 
                    mainComponent()
                    : 
                    mainComponent ?? null
                }
            </MainContainer>
            <DetailContainer
                open={open}
            >
                {_.isFunction(detailComponent)? 
                    detailComponent()
                    : 
                    detailComponent ?? null
                }
            </DetailContainer>
        </Container>
    )
}

/*
<MapContainer>
    <MapTransition
        open={open}
    >
        {_.isFunction(mainComponent)? 
            mainComponent()
            : 
            mainComponent ?? null
        }
    </MapTransition>
    <DrawerTransition
        variant="persistent"
        anchor="right"
        open={open}
    >
        {_.isFunction(detailComponent)? 
            detailComponent()
            : 
            detailComponent ?? null
        }
    </DrawerTransition>
</MapContainer>
*/

SideSheet.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
}

export default SideSheet