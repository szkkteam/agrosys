import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import {
    Grid,
} from '@material-ui/core';

import { 
    PrimaryActionButton,
    ViewButtonGroup,
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

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


const Routes = ({
    views,
    redirectTo,
    ...props
}) => {
    const redirectToValue = redirectTo ?? views[0].value
    return (
        <>
            {views.map(({value, component: Component}, i) => (
                <HashRoute key={value}  path={value} component={props => <Component {...props} />} />    
            ))}
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: redirectToValue}} />} />
        </>
    )
}


const TableLayout = ({
    title,
    views,
    primaryAction,
    redirectTo,
    onViewChange,
    children,
    ...props
}) => {
  
    return (
        <PageContent>
            <PageContent className="MuiPaper-root MuiPaper-rounded MuiPaper-elevation2" margin={[1, 2]}>
                <PageToolbar square elevation={0}>
                    <Grid
                        container
                        justify="flex-end"
                    >                    
                        <FlexGrid item xs={9}>
                            <PageHeader
                                noWrap
                                title={title}
                            />
                            <Spacer />
                            {primaryAction && <PrimaryActionButton
                                {...primaryAction}
                            /> }
                        </FlexGrid>
                        <FlexGrid item xs={3}>      
                            <Spacer />
                            {Array.isArray(views) && <ViewButtonGroup
                                handleChange={onViewChange}
                                items={views}
                            /> }
                        </FlexGrid>
                    </Grid>
                </PageToolbar>   
                {Array.isArray(views) ? (
                    <Routes views={views} redirectTo={redirectTo}/>
                ) : 
                    children
                }        
            </PageContent>
        </PageContent>
    )
}

TableLayout.propTypes = {
    primaryAction: PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]).isRequired,
        onClick: PropTypes.func
    }),
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    views: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        icon: PropTypes.elementType.isRequired,
        component: PropTypes.elementType.isRequired,
    })),
    onViewChange: PropTypes.func,
}

export default TableLayout