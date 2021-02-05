import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

import { DashboardLayout, DashboardCard } from 'farmApp/components/Dashboard'

import SeasonOverviewToolbar from '../SeasonOverviewToolbar/SeasonOverviewToolbar'

import { SeasonTimeline } from 'farmApp/cropProduction/season/widgets'
import { FieldWeather } from 'farmApp/cropProduction/fieldProduction/widgets'
import { CropUpcomingTask } from 'farmApp/cropProduction/task/widgets'

const SeasonOverviewLayout = ({

}) => {


    const widgetDefaults = {static: true}

    const seasonTimelineDefaults = {...widgetDefaults, i: 'SeasonTimeline', x: 12, y: 0, w: 3, h: 10}

    const fieldWeatherDefaults = {...widgetDefaults, i: 'FieldWeather', x: 0, y: 0, w: 6, h: 10}

    const upcomingTaskDefaults = {...widgetDefaults, i: 'CropUpcomingTask', x: 6, y: 0, w: 3, h: 10}

    const test = {...widgetDefaults, i: 'test', x: 0, y: 10, w: 3, h: 15}

    const components = [
        {key: 'SeasonTimeline', component: <SeasonTimeline />},
        {key: 'FieldWeather', component: <FieldWeather />},
        {key: 'CropUpcomingTask', component: <CropUpcomingTask />},
        {key: 'test', component: (
            <DashboardCard
                title="Test title"
                subheader="subheader bla bla"
            >
                <div>content</div>
            </DashboardCard>
        )}
        
    ]

    const layouts = {
        xxs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        xs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        sm: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        md: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        lg: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ]

    }

    return (
        <PageContent
            overflow
            spacing={4}
        >
            <PageHeader
                title="Season - wheat 2020"
                subtitle="From: 2020.06.05 to: 2020.08.10"
            >

            </PageHeader>
            <PageToolbar sticky>
                <SeasonOverviewToolbar
                />
            </PageToolbar>
            <div>
                <DashboardLayout
                    layouts={layouts}
                    components={components}
                >                    
                </DashboardLayout>
            </div>
        </PageContent>
    )
}


SeasonOverviewLayout.propTypes = {

}

export default SeasonOverviewLayout