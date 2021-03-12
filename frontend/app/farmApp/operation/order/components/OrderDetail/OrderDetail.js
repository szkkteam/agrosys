import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessage from 'messages'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing, typography } from '@material-ui/system'


import {
    ItemMenu,
    Tabs
} from 'components'

import {
    Container,
    Button,
    Typography,
    Grid,

    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'

import ScheduleIcon from '@material-ui/icons/Schedule';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
    MinimalLayout,
    FormCardLayout
} from 'farmApp/components'

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`


const FlexRow = styled.div`
    ${spacing}
    display: flex;
    align-items: center;
`


const InfoTitle = styled(Typography)`
    ${spacing}
`

const Spacer = styled.div`
    flex-grow: 1;
`

const EditButton = styled(Button)`
    ${spacing}
`

const ActionButton = styled(Button)`
    ${spacing}
    //width: 450px;
`

const ActionButtonContainer = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
`

const TaskDetailListItem = styled(ListItem)`
    ${spacing}
    display: flex;
    justify-content: space-between;
`
const TypoBold = styled(Typography)`
    ${typography}
`

const PlanTab = ({

}) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={8}>
                <FormCardLayout
                    title="Equipment"
                    subheader="Planned equipment to use"
                    
                >
                    <List component='ul'>
                        <ListItem component='li'>
                            <ListItemAvatar>
                                <Avatar>T</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="John Deere 1770D"
                                secondary="Tractor"
                            />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <RemoveCircleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </FormCardLayout>
                <FormCardLayout
                    mt={2}
                    title="Inputs"
                    subheader="Planned inputs to use"
                    
                >
                    
                </FormCardLayout>
            </Grid>
            <Grid item xs={4}>
                <FormCardLayout
                    expandable={false}
                    divider={false}
                    title="Task summary"
                >
                    <List component='ul'
                    >
                        <TaskDetailListItem component='li' divider py={2} px={0}
                        >
                            <TypoBold variant="body2" fontWeight="fontWeightBold">
                                Task type
                            </TypoBold>
                            <TypoBold variant="body2" fontWeight="fontWeightBold">
                                Cultivation
                            </TypoBold>
                        </TaskDetailListItem>
                        <TaskDetailListItem component='li' divider py={2} px={0}
                        >
                            <TypoBold variant="body2" fontWeight="fontWeightBold">
                                Implement
                            </TypoBold>
                            <TypoBold variant="body2" fontWeight="fontWeightBold">
                                Cultivator
                            </TypoBold>
                        </TaskDetailListItem>
                    </List>
                </FormCardLayout>
            </Grid>
        </Grid>
    )
}

const Content = ({

}) => {
    return (
        <Flex>
            <FlexRow ml={-2}>
                <FlexRow m={2} mt={1}>
                    <ScheduleIcon />
                    <InfoTitle pl={1} variant="body2">
                        In progress
                    </InfoTitle>
                </FlexRow>
                               
            </FlexRow>
            <Tabs
                divider
                tabs={[
                    {title: messages.plan},
                    {title: messages.actual},
                ]}
            >
                <PlanTab />
                <div>ch 4</div>
            </Tabs>
            <Spacer />
            <ActionButtonContainer>
                <ActionButton
                    py={1.5}
                    px={3}
                    variant="contained"
                    color="primary"
                >
                    Start working on Harvesting
                </ActionButton>
            </ActionButtonContainer>
        </Flex>
    )
}

const OrderDetail = ({

}) => {

    return (
        <MinimalLayout
            containerProps={{
                component: Container,
                maxWidth: 'lg',
                pb: 2
            }}
            title="Harvesting - Őszi búza 2020"
            subheader="Field 1, 12 ha"
            action={
                <>
                    <EditButton
                        mx={2}
                        color="primary"
                    >
                        <FormattedMessage {...globalMessage.edit} />
                    </EditButton>
                    <ItemMenu
                        icon={MoreVertIcon}
                        items={[
                            {title: globalMessage.delete, onClick: () => null }
                        ]}
                    />
                </>
            }
        >
            <Content />
        </MinimalLayout>
    )
}

OrderDetail.propTypes = {

}

export default OrderDetail