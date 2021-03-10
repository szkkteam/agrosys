import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    FormCardLayout
} from 'farmApp/components'

import {
    FieldListItemBoundary
} from 'farmApp/resource/field/components'

import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Card,
    CardHeader,
    CardContent,
    LinearProgress
} from '@material-ui/core'

const ProgressContainer = styled.div`
    width: 100%;
    padding: 0 15px;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const Progress = ({

}) => {
    return (
        <Card>
            <CardHeader
                title="Task progress"                
            />
            <ProgressContainer>
                <Flex>
                    <Typography variant="body2">
                        12 ha / 23 ha
                    </Typography>
                    <Spacer />
                    <Typography variant="body2">
                        72%
                    </Typography>
                </Flex>
                <LinearProgress
                    variant="determinate"
                    value={72}
                />
            </ProgressContainer>
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <FieldListItemBoundary />
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography variant="body2">
                                    Field 1
                                </Typography>
                            }
                            
                        />
                        <LinearProgress
                            variant="determinate"
                            value={72}
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

const OperationDetailOverview = ({

}) => {

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
                <Progress
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormCardLayout
                    title="Latest activities"
                >
                    <div>activity list</div>
                </FormCardLayout>
            </Grid>            
        </Grid>
    )
}

OperationDetailOverview.propTypes = {

}

export default OperationDetailOverview