import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { withLinkComponent } from 'utils/hoc'

import CloseIcon from '@material-ui/icons/Close';

import {
    Grid,
    Button,
    ClickAwayListener,
    IconButton,
    AppBar,
    Toolbar,
    Tab,
    Tabs,
    Card,
    CardContent,
    CardActions,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';

import SideDetailHeader from './SideDetailHeader'

const Container = styled(Grid)`
    //padding: 0 0 0 12px;
    position: relative;
`

const StyledToolbar = styled(Toolbar)`
    padding: 0 12px;
`

const Content = styled(Grid)`
    overflow-y: scroll;
    height: 630px;
    padding: 0 12px;
    padding-bottom: 24px;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const SectionContainer = styled.div`
    margin: 10px 0;
    width: 100%;
`

const floatButtonWidth = 300
const FloatButton = styled(Button)`
    position: absolute;
    width: ${floatButtonWidth}px;
    //margin: 0 auto;
    bottom: 10px;
    left: 50%;
    margin-left: -${floatButtonWidth/2}px;
`

const Spacer = styled.div`
    flex-grow: 1;
`


const DetailContent = ({

}) => {
    return (
        <>
            <DetailSuggestions />
            <DetailFieldStatus />
            <GrowthStage />
            <DetailWeather />
            <DetailTask />
            <DetailNotes />
        </>
        
    )
}

const SideDetail = ({
    title,
    buttons,
    tabs,
    data,
    headerProps,
    onClose,
    children,

    ...props
}) => {

    const [tabValue, setTabValue] = useState(tabs? 0 : null)

    const handleTabChange = (e, value) => {
        setTabValue(value)
    }

    const childComponent = useMemo(() => {
        return tabs? tabs[tabValue].component : children
    }, [tabValue, children])

    return (     
        <Container
            container
            spacing={0}
            direction="row"
            //justify="center"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item xs={12}>
                <SideDetailHeader 
                    title={title}
                    data={data}
                    value={tabValue}
                    tabs={tabs}
                    buttons={buttons}
                    onClose={onClose}
                    onTabChange={handleTabChange}
                />
            </Grid>
            <Content item xs={12}>
                {_.isFunction(childComponent)
                    ? childComponent()
                    : childComponent
                }
            </Content>      
        </Container>
    )
}

SideDetail.propTypes = {

}

export default SideDetail