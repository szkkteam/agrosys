import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { pushModalWindow } from 'redux-promising-modals';
import { bindActionCreators } from 'redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'

import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

import {
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Grid
} from '@material-ui/core';

//import { messages as ButtonMessages } from 'components/Button'
//import { FieldFormStepButton } from '../../components'
import { LeafletMap } from 'farmApp/map/components'

import { PrimaryButton, SecondaryButton, MasterDetail } from 'components'

const MapSnapshot = styled(LeafletMap)`
    width: 100%;
    height: 300px;
`

const Container = styled.div`
    padding: 15px;
    display: flex;
    width: 100%;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center
`

const ColumnHeader = styled.div`
    width: 100%;
    margin: auto;
    flex: 0 0 92px;
`

const ColumnFooter = styled.div`
    width: 100%;
    margin: auto;
    flex: 0 0 92px;
    display: flex;
    align-items: center;
`

const ColumnContent = styled.div`
    width: 100%;
    margin: auto;
    flex: 1;
`

const Title = styled(Typography)`
    margin-bottom: 10px;
`

const DescriptionContainer = styled.div`
    margin: 0px 25px;
    h6 {
        margin-bottom: 15px;
    }
    button {
        margin-top: 25px;
    }
`

const SimpleLayout = ({children, props}) => (
    <Grid 
        container
        direction="row"
        justify="center"
        spacing={1}
    >
        <Grid container item xs spacing={2}>
            {children}
        </Grid>
    </Grid>
)

const FieldDetailLayout = ({
    title,
    master,
    primaryButtonProps,
    secondaryButtonProps,
    alignFooter="right",
    children,
}) => {


    return (      
        <Container>
            { title && <ColumnHeader>
                {title}
            </ColumnHeader> }
            <ColumnContainer>
                           
                <ColumnContent>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        spacing={1}
                    >
                        <Grid container item xs spacing={2}>
                            {children}
                        </Grid>
                    </Grid>
                </ColumnContent>
                <ColumnFooter>
                    <Grid container justify={alignFooter === "right"? "flex-end" : alignFooter === "left"? "flex-start" : "center"} >
                        <div>
                            <SecondaryButton {...secondaryButtonProps} />
                            <PrimaryButton {...primaryButtonProps} />
                        </div>
                    </Grid>
                </ColumnFooter>                                
            </ColumnContainer>            
        </Container>
    ) 
}
/*
  
*/

FieldDetailLayout.propTypes = {
    primaryButtonProps: PropTypes.shape({
        title: PropTypes.object.isRequired
    }),
    secondaryButtonProps: PropTypes.shape({
        title: PropTypes.object.isRequired
    })
}

export default FieldDetailLayout