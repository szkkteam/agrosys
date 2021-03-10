import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    Tab,
    Tabs as MuiTabs,
    Divider,
} from '@material-ui/core';

const SpacingDivider = styled(Divider)`
    ${spacing}
`

const Tabs = ({
    defaultActive=0,
    value,
    tabs,
    onChange,
    divider=false,
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
                onChange={handleChange}
                indicatorColor="primary"
                {...props}
            >
                {tabs && tabs.map(({title, ...props}, i) => (
                    <Tab value={i} label={typeof(title) === 'object'? intl.formatMessage(title): title} {...props} />
                ))}                            
            </MuiTabs>
            {divider && <SpacingDivider mb={2} />}
            {children && renderChild}
        </>
    )
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
}

export default Tabs