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


import FieldDetailMapSnapshot from '../FieldDetailMapSnapshot/FieldDetailMapSnapshot'

import GeneralFields from './GeneralFields'
import LpisFields from './LpisFields'
import NotesFields from './NotesFields'

const FieldDetailPage = ({
    name,
    onBorderEditClick,

}) => {
    return (
        <Grid container>
            <Grid container item xs={12} justify="flex-start" >
                <Grid container item xs={10} spacing={4} style={{marginLeft: "50px"}}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5">
                            My table 1, 4 ha
                        </Typography>
                    </Grid>                    
                    <Grid container item xs={5} spacing={3}>
                        <Grid item xs={12}>
                            <GeneralFields
                                name={name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LpisFields
                                name={`${name}.lpis`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <NotesFields
                                name={name}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={7}>
                        <FieldDetailMapSnapshot
                            onBorderEditClick={onBorderEditClick}
                        />            
                    </Grid>                    
                </Grid>
            </Grid>
        </Grid>
    )
}

FieldDetailPage.propTypes = {

}

export default FieldDetailPage