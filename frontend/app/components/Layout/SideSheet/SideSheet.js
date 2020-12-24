import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSplitComponents } from 'utils/hooks'

import {
    Grid,
    Drawer,
} from '@material-ui/core';

const detailWidth = 400

const MapContainer = styled.div`
    display: flex;
    height: 100%;
`

const MapTransition = styled(({open: dummy = null, ...props}) => <div {...props} />)`
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    display: flex;
    width: 100%;
    ${({ theme, open }) => open === true
    ? `
        //display: flex;
        //transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        width: calc(100% - ${detailWidth}px);
        //margin-right: ${detailWidth}px;
    `
    : `
        //transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;        
        //display: flex;
        //width: 100%;
    `
    }
`

const DrawerTransition = styled(Drawer)`
    ${({ theme, open }) => `
    width: ${open? `${detailWidth}px`: `0px`};
    flex-shrink: 0;

    .MuiPaper-root {
        width: ${detailWidth}px;
        top: initial;
    }
    `}
`

const SideSheet = ({
    open,
    children,
    ...props
}) => {
    const [mainComponent, detailComponent] = useSplitComponents(children)

    return (
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