import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { pushModalWindow } from 'redux-promising-modals';
import { bindActionCreators } from 'redux'

import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'

import { Field, reduxForm, FieldArray } from 'redux-form'

import { 
    HiddenField,
    TextField,
    TextComponent,
    SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import { 
    PrimaryActionButton,
} from 'components'

import GridTable from 'farmApp/components/GridTable'
import DeleteIcon from '@material-ui/icons/Delete';

import {
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'

import { FIELD_SEASON_FORM } from '../../constants'

import FieldDetailLayout from '../FieldDetailLayout/FieldDetailLayout'
import FieldDetailPage from '../FieldDetailPage/FieldDetailPage'
import FieldMasterList from '../FieldMasterList/FieldMasterList'
import FieldCreateGridView from '../FieldCreateGridView/FieldCreateGridView'


const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
`

class FieldCreateDraw extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentIdx: 0
        }
    }

    componentDidMount() {
        const { startDraw = false } = this.props
        // If component is called within create context
        // FIXME: Modal is rendered twice because something if fucked up with the routers
        if (startDraw) {
            this.openFieldDraw()
        }
            
        
    }


    setCurrent = () => {
        this.setState({
            currentIdx: this.state.currentIdx? 0 : 1
        })
    }

    openFieldDraw = () => {
        const { pushModalWindow, array } = this.props

        const initialValues = {

        }

        const dummyGeojson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-109.05, 41.00],
                    [-102.06, 40.99],
                    [-102.03, 36.99],
                    [-109.04, 36.99],
                    [-109.05, 41.00]
                ]]
            }
        }

        // Payload should be an array of geometries. Also give the possibility to the user to fill out some data directly on the map
        // 
        const dummyPayload = [
            { title: "Valami tábla", geometry: dummyGeojson, area: 13231.23 },
            { title: "Másik tábla", geometry: dummyGeojson, area: 13231.23, lpis: {mepar: "7634XD-45"} },
            { geometry: dummyGeojson, area: 13231.23 },
        ]

        console.debug("Push modal")
        pushModalWindow(FIELD_DRAW_DIALOG, {initialValues}).then(({payload, status}) => {

            if (status === MODAL_TYPE_CONFIRM) {
                console.debug("Payload: ", payload)
                dummyPayload.map(field => array.push('parcels', field))
                //array.push('productions', payload)
            }
        })
    }


    handleDeleteParcel = (index) => {
        this.props.array.remove('parcels', index)
    }


    renderTable = (tableProps) => {
        return <FieldCreateGridView 
                    onAddNew={this.openFieldDraw}
                    onDeleteItem={this.handleDeleteParcel}
                    {...tableProps}
                />
    }

    render() {

        const {
            handleSubmit,
        } = this.props

        const {
            currentIdx
        } = this.state

        console.debug("currentIdx: ", currentIdx)

        return (
            <Form onSubmit={handleSubmit}>  
                <FieldDetailLayout
                >
                    <FieldArray name="parcels" component={this.renderTable} />                
                </FieldDetailLayout>  
            </Form>
        )
    }
}


const withForm = reduxForm({
    form: FIELD_SEASON_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
)

const ConnectedFieldCreateDraw = compose(
    withConnect,
    withForm,
)(FieldCreateDraw) 

export default ConnectedFieldCreateDraw