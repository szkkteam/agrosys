import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    Card,
    CardHeader,
    CardContent,
    IconButton
} from '@material-ui/core'

import { ExpandPanelGroup } from 'farmApp/components'

import PanelContext from './Context'
import CropPanel from './CropPanel'
import CropDetail from './CropDetail'
import CropSummary from './CropSummary'

const CropProductionSeasonPanel = ({
    className,
    children,
    ...props
}) => {
   
    const contextObject = {

    }

    return (
        <PanelContext.Provider
            value={contextObject}
        >
            <Card className={className}>
                <CardHeader
                    title="Season 2019"
                    subheader="(2019 Szeptember 9 - 2020 Január 10)"
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    {...props}
                />
                <CardContent>
                    <ExpandPanelGroup>
                        {children}
                    </ExpandPanelGroup>                    
                </CardContent>
            </Card>
        </PanelContext.Provider>
    )
}

CropProductionSeasonPanel.propTypes = {
    action: PropTypes.element
}

CropProductionSeasonPanel.Panel = CropPanel
CropProductionSeasonPanel.Detail = CropDetail
CropProductionSeasonPanel.Summary = CropSummary

export default CropProductionSeasonPanel