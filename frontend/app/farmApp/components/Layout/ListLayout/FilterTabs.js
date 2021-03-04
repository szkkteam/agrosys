import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import {
    Tab,
    Tabs,
} from '@material-ui/core';


const FilterTabs = ({

    defaultActive=0,
    tabs,
    onChange,
    ...props
}) => {
    const intl = useIntl()
    const [activeTab, setActiveTab] = useState(defaultActive)
  
    const handleChange = (e, newValue) => {
        setActiveTab(newValue)
        onChange && onChange(tabs[newValue])
    }

    return (
        <Tabs
            value={activeTab}
            onChange={handleChange}
            {...props}
        >
            {tabs && tabs.map(({title, ...props}, i) => (
                <Tab value={i} label={typeof(title) === 'object'? intl.formatMessage(title): title} {...props} />
            ))}                            
        </Tabs>
    )
}

FilterTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
    })),
    defaultActive: PropTypes.number,
    onChange: PropTypes.func
}

export default FilterTabs