import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { spacing } from '@material-ui/system'

import {
    Tab,
    Tabs as MuiTabs,
    Divider,
} from '@material-ui/core';

import HashRoute from 'utils/route/HashRoute'
import TabLink from './TabLink'

const SpacingDivider = styled(Divider)`
    ${spacing}
`

const MemoryTab = ({
    defaultActive=0,
    value,
    tabs,
    divider=false,
    onChange,
    children,
    ...props
}) => {
    const intl = useIntl()
    const [activeTab, setActiveTab] = useState(defaultActive)


    const handleChange = (e, newValue) => {
        setActiveTab(newValue)
        onChange && onChange(newValue)
    }

    const renderChild = useMemo(() => {
        if (!children) return null
        else {
            const activeChild = React.Children.toArray(children)[activeTab]
            return React.cloneElement(activeChild, {})
        }

    }, [activeTab])

    return (
        <>
            <MuiTabs
                value={value ?? activeTab}
                indicatorColor="primary"
                onChange={handleChange}
                {...props}
            >
                {tabs && tabs.map(({title, ...props}, i) => (
                    <Tab key={`tab-${i}`} value={i} label={typeof(title) === 'object'? intl.formatMessage(title): title} {...props} />
                ))}                            
            </MuiTabs>
            {divider && <SpacingDivider mb={2} />}
            {children && renderChild}
        </>
    )
}

const HasTab = ({
    defaultActive,
    value,
    tabs,
    onChange,
    divider=false,
    children,
    ...props
}) => {
    const location = useLocation()
    const intl = useIntl()


    const handleChange = (e, newValue) => {
        onChange && onChange(newValue)
    }
  
    const getHashValue = (value) => value.startsWith('#')? value : `#${value}`

    const renderChildren = useMemo(() => 
        React.Children.map(children, (child, i) => (
            <HashRoute key={tabs[i].value} path={getHashValue(tabs[i].value)} component={props => 
                React.cloneElement(child, {...props})
            } /> 
        ))
    , [])

    return (
        <>
            <MuiTabs
                value={location.hash}
                indicatorColor="primary"
                onChange={handleChange}
                {...props}
            >
                {tabs && tabs.map(({title, value, ...props}, i) => (
                    <TabLink key={`tab-${i}`} to={ {...location, hash: getHashValue(value)} } value={getHashValue(value)} label={typeof(title) === 'object'? intl.formatMessage(title): title} {...props} />
                ))}                            
            </MuiTabs>
            {divider && <SpacingDivider mb={2} />}
            {children && renderChildren}
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: getHashValue(defaultActive ?? tabs[0].value)}} />} /> 
        </>
    )
}

const Tabs = ({
    hash=false,
    ...props
}) => {


    if (hash) {
        return (
            <HasTab {...props}/>
        )
    } else {
        return (
            <MemoryTab {...props}/>
        )
    }
    
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
    })),
    defaultActive: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.any,
    divider: PropTypes.bool,
    hash: PropTypes.bool,
}

export default Tabs