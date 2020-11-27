import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Popover } from 'components'
import Button from '@material-ui/core/Button';


const Content = forwardRef(({children}, ref) => 
    <Paper
        ref={ref}
        style={{padding: "15px 5px"}}
    >
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                {children}
            </Grid>
            <Grid item xs={6} style={{textAlign: "center"}}>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Clear
                </Button>
            </Grid>
            <Grid item xs={6} style={{textAlign: "center"}}>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Apply
                </Button>
            </Grid>
        </Grid>        
    </Paper>
)

const WorkerFilterButton = ({
    title,
    children,
    ...props
}) => {
    const intl = useIntl()


    return (
        <Popover
            title={intl.formatMessage(title)}
            placement='bottom-start'
            componentProps={{
                variant: 'contained',
                style: {height: "100%"}
            }}
            //title="Filter"
        >
            <Content>
                {children}
            </Content>
        </Popover>
    )
}

WorkerFilterButton.propTypes = {
    children: PropTypes.element.isRequired,
}

export default WorkerFilterButton