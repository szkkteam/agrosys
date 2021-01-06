import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    ${({ theme, height }) => `
        ${height? `height: ${height}px;` : ''}
    `}  
`
import {
    Tabs,
    Tab,
} from '@material-ui/core';

const tabProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}


const DetailTabs = ({
    tabs,
    children,
    ...props
}) => {
    const intl = useIntl()
    console.debug("DetailTab - props: ", props)
    //<Tab label={intl.formatMessage(messages.generalTabTitle)} {...tabProps(0)} />
    return (
        <Tabs
            orientation="vertical"
            //variant="scrollable"
            {...props}
        >
            { tabs && tabs.map((label, i) => (
                <Tab key={i} label={intl.formatMessage(label)} value={i} {...tabProps(i)} />    
            ))}
        </Tabs>
    )
}

DetailTabs.propTypes = {

}

export default DetailTabs