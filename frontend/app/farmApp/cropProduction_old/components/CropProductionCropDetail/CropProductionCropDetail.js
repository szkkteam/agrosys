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

import CropField from './CropField'
import CropGrow from './CropGrow'
import CropTask from './CropTasks'
import CropWeather from './CropWeather'

const TabContent = ({

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

TabContent.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.oneOf([
        PropTypes.string,
        PropTypes.object
    ])).isRequired,
}

const CropProductionCropDetail = (props) => {
    const { children} = props

    if (React.Children.toArray(children).length === 1) 
        return children
    else 
        return <TabContent {...props} />
}

CropProductionCropDetail.propTypes = {
    
}

CropProductionCropDetail.Field = CropField
CropProductionCropDetail.Grow = CropGrow
CropProductionCropDetail.Task = CropTask
CropProductionCropDetail.Weather = CropWeather

export default CropProductionCropDetail