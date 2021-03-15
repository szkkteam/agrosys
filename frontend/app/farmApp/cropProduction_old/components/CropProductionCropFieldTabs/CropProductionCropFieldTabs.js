import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useFormatTitle } from 'utils/hooks'

import {
    Tabs,
    Tab,
    Toolbar,
} from '@material-ui/core'

const CropProductionCropFieldTabs = ({
    defaultActive=0,
    tabs,
    children,
    ...props
}) => {
    const intl = useIntl()
    const [tab, setTab] = useState(defaultActive)

    const handleTabChange = (e, newTab) => {
        setTab(newTab)
    }

    const activeChild = useMemo(() => 
        React.Children.toArray(children)[tab]
    , [tab])

    return (
            <>
                <Toolbar>
                    <Tabs
                        indicatorColor="primary"
                        value={tab}
                        onChange={handleTabChange}
                    >
                        {React.Children.map(children, (child, i) => (
                            <Tab value={i} label={tabs[i]} />
                        ))}
                    </Tabs>
                </Toolbar>
                {activeChild}
            </>
    )
}

CropProductionCropFieldTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.oneOf([
        PropTypes.string,
        PropTypes.object
    ])).isRequired,
}

export default CropProductionCropFieldTabs