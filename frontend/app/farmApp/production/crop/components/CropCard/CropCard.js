import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { ROUTES } from 'routes'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { 
    PrimaryActionButton,
} from 'components'

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Collapse,
    List
} from '@material-ui/core'

import {
    CropProductionItem
} from '../../components'

const IconLink = withLinkComponent(IconButton)

const CardContainer = styled.div`
    //margin: 5px;
`

const CropGraph = styled.div`
    height: 100px;
    width: 100%;
    background-color: lightgray;
`

const SmallIconButton = styled(IconLink)`
    padding: 0;
`

const ExpandIcon = styled(({expanded, ...props}) => <IconButton {...props}/>)`
    ${({theme, expanded}) =>`
        transform: ${expanded? 'rotate(180deg)': 'rotate(0deg)'};
        margin-left: auto;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    `}
`

const StyledCardContent = styled(CardContent)`
    padding-left: 0;
    padding-right: 0;
`
const ScrollCollapse = styled(({in: inProps, ...props}) => <Collapse in={inProps} {...props}/>)`
    max-height: 200px;
    overflow-x: hidden;
    ${({in: inProps}) => `
        overflow-y: ${inProps? "scroll" : "hidden"};
    `}       
`

const CropCard = ({
    ...props
}) => {
    const [expanded, setExpanded] = useState(false)

    const handleExpand = () => {
        setExpanded(!expanded)
    }

    const productionItems = [
        {},
        {},
        {},
        {},
        {},
    ]

    return (
        <Card
            {...props}
        >
            <CardHeader
                avatar={
                    <SmallIconButton
                        to={ROUTES.ProductionDetail}
                        params={{cropId: 1, productionId: 1}}
                    >
                        <Avatar aria-label="wheat">
                            W
                        </Avatar>
                    </SmallIconButton>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="My wheat"
                subheader="Spring wheat"
            />          
            <CropGraph>
                TODO: Place here a small graph, which display some usefull information
            </CropGraph>
            <StyledCardContent>
                <List
                    subheader="Seasons"
                >

                    <ScrollCollapse 
                        collapsedHeight="72px" // TODO: Fix this value in the production list item
                        in={expanded}
                        timeout="auto"
                        //unmountOnExit
                    >
                        { productionItems && productionItems.map((item, i) => (
                            <CropProductionItem
                                key={i}
                            />
                        )) }
                    </ScrollCollapse>
                </List>               
            </StyledCardContent>
            <CardActions disableSpacing>
                <PrimaryActionButton
                    title={messages.addNewTitle}
                />
                <ExpandIcon
                    onClick={handleExpand}
                    expanded={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandIcon>
            </CardActions>
        </Card>
    )
}

CropCard.propTypes = {

}

export default CropCard