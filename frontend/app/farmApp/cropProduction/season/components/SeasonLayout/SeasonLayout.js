import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { HashRoute } from 'utils/route'
import { ROUTES } from 'routes'

import { VIEW_MODULE, VIEW_LIST } from '../../constants'

import { 
    TableHeader,
} from 'components/Table'

import { 
    PrimaryActionButton,
    ViewButtonGroup,
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

import SeasonList from '../SeasonList/SeasonList'

const Placeholder = () => <div>Placeholder Layout</div>

import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ListIcon from '@material-ui/icons/List';

import {
    Grid,
} from '@material-ui/core'

const Container = styled.div`
    padding: 0px 20px;
    padding-top: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const ProductionRoutes = ({
    height,
}) => {
    return (
        <>
            <HashRoute path={VIEW_MODULE} component={props => <Placeholder height={height} {...props} />} />
            <HashRoute path={VIEW_LIST} component={props => <SeasonList height={height} {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_LIST}} />} />
        </>
    )
}


const SeasonLayout = ({

}) => {

   const views = [
        {value: VIEW_LIST, icon: ListIcon},
        {value: VIEW_MODULE, icon: ViewModuleIcon},
    ]

    return (
        <PageContent
        >
            <PageHeader
                title="Seasons - list"
            >
                
            </PageHeader>
            <PageToolbar
            >
                <Grid
                    container
                    justify="flex-end"
                >
                    <FlexGrid item xs={9}>
                        <Spacer />
                        <PrimaryActionButton
                            title={messages.addNewTitle}
                        />
                    </FlexGrid>
                    <FlexGrid item xs={3}>      
                        <Spacer />
                        <ViewButtonGroup
                            items={views}
                        />
                    </FlexGrid>
                </Grid>
            </PageToolbar>            
            <ProductionRoutes 
            />
        </PageContent>
    )
}

/*
        <div>
        Crop overview. Show quick stats about crops and running productions.<br/>
        Add possibility to create crop, or create production directly under specifc crop or create inline crop for it.<br/>
        Also manage the seasons?<br/>
    </div>
*/

SeasonLayout.propTypes = {

}

export default SeasonLayout
