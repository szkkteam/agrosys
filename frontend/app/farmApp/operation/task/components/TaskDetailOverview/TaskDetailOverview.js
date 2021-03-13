import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    FormCardLayout,
    Table
} from 'farmApp/components'

import {
    FieldListItem
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
    LinearProgress,

    Avatar,

    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core'

import AvatarGroup from '@material-ui/lab/AvatarGroup';

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

const Assigment = ({
     
}) => {
    return (
        <FormCardLayout
            title="Assignments"
            subheader="2 unassigned"
        >
            <Table
                data={[                    
                    {test: "bbb", cropType: {title: "Kukorica", short: "ku"}},
                    {test: "cica", cropType: {title: "Árpa", short: "ár"}},
                ]}
                columns={[
                    {
                        title: 'Field',
                        render: (rowData) => (
                            <FieldListItem
                                id={1}
                                disableAction
                                disableButton
                            />
                        )
                    },
                    {
                        title: 'Assignments',
                        render: (rowData) => (
                            <AvatarGroup max={2}>
                                <Avatar>JF</Avatar>
                                <Avatar>JD</Avatar>
                                <Avatar>PB</Avatar>
                            </AvatarGroup>
                        )
                    },
                    {
                        title: 'Date',
                        render: (rowData) => (
                            <Typography variant="body2">
                                2021 Január 14
                            </Typography>
                        )
                    }
                    

                ]}
                options={{
                    paging: false,
                }}
                components={{
                    Toolbar: () => null,
                    Header: () => null,
                }}
                
            />
            
        </FormCardLayout>
    )
}

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

const TaskDetailOverview = ({

}) => {

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
                <Assigment
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

TaskDetailOverview.propTypes = {

}

export default TaskDetailOverview