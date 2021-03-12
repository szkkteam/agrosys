import React, { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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


const FormCardLayout = ({
    className,
    title,
    children,
    expandable=true,
    divider=true,
    fab,
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
                    {divider && <Divider />}
                    {fab}
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

FormCardLayout.propTypes = {

}

export default styled(FormCardLayout)`${spacing}`