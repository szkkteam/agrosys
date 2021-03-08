import React, { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    Grid,
    Paper,
    Typography,
    Divider,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    IconButton,
    Collapse
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


const FormSection = ({
    className,
    title,
    children,
    expandable=true,
    ...props
}) => {
    const [expanded, setExpanded] = useState(true)

    const toggleCollapse = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={className}>
            {title && 
                <>
                    <CardHeader                        
                        title={title}
                        action={
                            expandable && <IconButton aria-label="settings" onClick={toggleCollapse}>
                                {!expanded? (
                                    <ExpandMoreIcon />
                                ) : (
                                    <ExpandLessIcon />
                                )}
                            </IconButton>
                          }
                        {...props}
                    />
                    <Divider /> 
                </>
            }
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    {children}
                </CardContent>
            </Collapse>
            
        </Card>
    )
}

FormSection.propTypes = {

}

export default styled(FormSection)`${spacing}`