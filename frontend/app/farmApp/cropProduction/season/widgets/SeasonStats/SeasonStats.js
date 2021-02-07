import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import {
    WidgetMedium,
} from 'farmApp/components'

import {
    Tab,
    Tabs,
    Slide
} from '@material-ui/core'

import CropTab from './CropTab'
import GeneralTab from './GeneralTab'

const FinanceTab = () => <div>Finance</div>

const SeasonStats = ({

}) => {

    const [activeTab, setActiveTab] = useState(0)

    const handleTabChange = (e, newValue) => {
        setActiveTab(newValue)
    }

    const tabComponents = [
        GeneralTab,
        FinanceTab,
        CropTab
    ]

    const ActiveComponent = tabComponents[activeTab]

    return (
        <WidgetMedium
            title="Seasons statistic"
            headerProps={{
                shrinkHeader: true
            }}
            headerChildren={
                <Tabs
                    variant="fullWidth"
                    value={activeTab}
                    onChange={handleTabChange}
                >
                    <Tab value={0} label="General" />
                    <Tab value={1} label="Finance" />
                    <Tab value={2} label="Crop" />
                </Tabs>
            }
        >
            <ActiveComponent />
        </WidgetMedium>
    )
}

SeasonStats.propTypes = {

}

export default SeasonStats