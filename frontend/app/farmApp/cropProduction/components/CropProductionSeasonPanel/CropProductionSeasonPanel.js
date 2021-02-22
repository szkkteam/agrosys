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

import PanelContext from './Context'
import CropPanel from './CropPanel'
import CropDetail from './CropDetail'
import CropSummary from './CropSummary'

const CropProductionSeasonPanel = forwardRef(({
    className,
    children,
    ...props
}, ref) => {
    const [expanded, setExpanded] = useState({})

    const handleExpandChange = (i) => () => {
        if (expanded[i] !== undefined) setExpanded({})
        else setExpanded({[i]: true})
    }

    useImperativeHandle(ref, () => ({
        expand(i) {
            setExpanded({[i]: true})
        },        
    }));
    
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
                    {React.Children.map(children, (child, i) => (
                        React.cloneElement(child, {
                            key: i,
                            expanded: expanded[i] !== undefined,
                            onExpandChange: handleExpandChange(i)
                        })
                    ))}
                </CardContent>
            </Card>
        </PanelContext.Provider>
    )
})

CropProductionSeasonPanel.propTypes = {
    action: PropTypes.element
}

CropProductionSeasonPanel.Panel = CropPanel
CropProductionSeasonPanel.Detail = CropDetail
CropProductionSeasonPanel.Summary = CropSummary

export default CropProductionSeasonPanel