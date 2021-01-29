import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    HeaderContent
} from 'components'

import {
    DashboardWidgetLayout,
    DashboardHeader
} from '..'

import {
    WidgetTaskSummary
} from 'farmApp/dashboard/widgets/components'

import {
    WIDGET_TASKS_SUMMARY
} from 'farmApp/dashboard/widgets/widgetTypes'



const DashboardLayout = ({

}) => {
    const intl = useIntl()

    const defaultWidgets = [
        {key: WIDGET_TASKS_SUMMARY, label: intl.formatMessage(messages.widgetTaskSummary), x: 0, y: 0, w: 3, minW: 3, h: 9, Component: WidgetTaskSummary}
    ]

    const [widgets, setWidgets] = useState(defaultWidgets)

    const availableWidgets = useMemo(() => {
        return _.differenceBy(defaultWidgets, widgets, 'key')
    }, [widgets])

    const handleRemoveWidget = (key) => {
        setWidgets(widgets.filter( el => el.key != key))
        //console.debug("handleRemoveWidget: ", key)
    }

    const handleAddWidget = (key) => {
        const newWidget = defaultWidgets.filter(el => el.key == key)
        setWidgets(_.concat(widgets, newWidget))
    }

    return (
        <HeaderContent>
            <DashboardHeader 
                widgets={availableWidgets}
                onAdd={handleAddWidget}

            />
            <DashboardWidgetLayout 
                widgets={widgets}
                onRemoveWidget={handleRemoveWidget}
            />
        </HeaderContent>
    )
}

DashboardLayout.propTypes = {

}

export default DashboardLayout