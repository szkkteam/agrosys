import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { withLinkComponent } from 'utils/hoc'
import { ROUTES } from 'farmApp/routes'

import EventNoteIcon from '@material-ui/icons/EventNote';
import {
    IconButton
} from '@material-ui/core'

import { VIEW_CALENDAR } from '../../constants'

const Link = withLinkComponent(IconButton)

const TaskCalendarButton = ({

}) => {
    return (
        <Link            
            to={ROUTES.CropProductionTask}
            dataProps={{hash: VIEW_CALENDAR}}
            color="inherit"
        >
            <EventNoteIcon />
        </Link>
    )
}

TaskCalendarButton.propTypes = {

}

export default TaskCalendarButton