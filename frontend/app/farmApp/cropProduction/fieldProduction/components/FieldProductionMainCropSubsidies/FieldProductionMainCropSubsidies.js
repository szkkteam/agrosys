import React, { useState, useRef, useLayoutEffect } from 'react'
import globalMessages from 'messages'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { FieldArray } from 'redux-form'

import { 
    HiddenField,
    TextComponent,
    TextField,
    SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import GridTable from 'farmApp/components/GridTable'

import { DetailFooter } from 'farmApp/components/Detail'

import {
    FieldListItem
} from 'farmApp/resource/field/components'

import DeleteIcon from '@material-ui/icons/Delete';

import {
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'


const ContentContainer = styled.div`
    padding: 10px 15px;
    flex-grow: 1;
`

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const variants = [
    {id: 1, title: "ABONY", },
    {id: 2, title: "ACTIVUS", },
]

class FieldProductionMainCropSubsidies extends React.Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {

    }

    handleDeleteParcel = (index) => () => {
        const { array } = this.props
        array.remove('fields', index)
    }


    renderTable = ({fields, meta: { error, submitFailed }}) => {
        const { fields: fieldsData } = this.props

        const columns = [
            {title: 'Fields', size: 1.5, render: (field, i) => 
                <FieldListItem
                    disableAction={true}
                    {... fieldsData && fieldsData.length? {id: fieldsData[i].fieldId} : {}} 
                />                
            },
            {title: 'Table number', render: (field, i) => <TextField name={`${field}.field.tableNumber`}
                                                        label="Table number"
                                                        formProps={{fullWidth: true}}
                                                    />
            },
            {title: 'AKG codes', render: (field, i) => <SearchSelectField name={`${field}.field.akgCodes`}
                                                            label="AKG codes"
                                                            disableClearable={true}
                                                            formProps={{fullWidth: true}}
                                                            options={variants}
                                                            //idAccessor={(o) => o.id}
                                                            groupBy={(option) => option.category}
                                                            getOptionLabel={(option) => option.title}
                                                        />
            },
            {title: 'KET/KAT', render: (field, i) => <TextField name={`${field}.field.katKet`}
                                                        label="KAT/KET"
                                                        formProps={{fullWidth: true}}
                                                    />
            },
            {title: 'Subsidies', render: (field, i) => <SearchSelectField name={`${field}.field.subsidies`}
                                                            label="Subsidies"
                                                            disableClearable={true}
                                                            formProps={{fullWidth: true}}
                                                            options={variants}
                                                            //idAccessor={(o) => o.id}
                                                            groupBy={(option) => option.category}
                                                            getOptionLabel={(option) => option.title}
                                                        />
            },
            {title: '', size: "0 0 40px", spacing: 0, render: (data, index) => (
                <IconButton
                    onClick={this.handleDeleteParcel(index)}
                >
                    <DeleteIcon />
                </IconButton>)
                }
        ]
        return (
            <GridTable
                columns={columns}
                data={fields}
                columnSpacing={3}
            />
        )
    }

    render () {
        const {
            handleSubmit,
            onBack,
            footer,
        } = this.props

        return (
            <Form onSubmit={handleSubmit}>
                <ContentContainer>
                    <FieldArray name="fields" component={this.renderTable} />
                </ContentContainer>
                {footer}
            </Form>
        )
    }
}

export default FieldProductionMainCropSubsidies