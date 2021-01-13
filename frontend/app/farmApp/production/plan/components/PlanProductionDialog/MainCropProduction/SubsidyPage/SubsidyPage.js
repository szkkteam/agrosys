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
    //SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import GridTable from 'farmApp/components/GridTable'

import { DetailFooter } from 'farmApp/components/Detail'

import {
    FieldListItem
} from 'farmApp/production/field/components'

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


const SubsidyPage = ({
    onSubmit,
    handleSubmit,
    onBack,
    data,
    array,
    children,
    ...props
}) => {

    const handleDeleteParcel = (index) => () => {
        array.remove('parcels', index)
    }

    const columns = [
        {title: 'Parcels', size: 1.5, render: (rowData) => <FieldListItem data={rowData} />},
        {title: 'Table number', render: (rowData) => <TextComponent name="cropType"
                                                    //label={intl.formatMessage(messages.cropType)}
                                                    label="Table number"
                                                    //variant="outlined"
                                                    formProps={{fullWidth: true}}
                                                    //idAccessor={(o) => o.id}
                                                />
        },
        {title: 'AKG codes', render: (rowData) => <SearchSelectComponent name="cropType"
                                                        //label={intl.formatMessage(messages.cropType)}
                                                        label="AKG codes"
                                                        //variant="outlined"
                                                        disableClearable={true}
                                                        formProps={{fullWidth: true}}
                                                        options={variants}
                                                        //idAccessor={(o) => o.id}
                                                        groupBy={(option) => option.category}
                                                        getOptionLabel={(option) => option.title}
                                                    />
        },
        {title: 'KET/KAT', render: (rowData) => <TextComponent name="cropType"
                                                    //label={intl.formatMessage(messages.cropType)}
                                                    label="KAT/KET"
                                                    //variant="outlined"
                                                    formProps={{fullWidth: true}}
                                                    //idAccessor={(o) => o.id}
                                                />
        },
        {title: 'Subsidies', render: (rowData) => <SearchSelectComponent name="cropType"
                                                        //label={intl.formatMessage(messages.cropType)}
                                                        label="Subsidies"
                                                        //variant="outlined"
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
                onClick={handleDeleteParcel(index)}
            >
                <DeleteIcon />
            </IconButton>)
            }
    ]


    const renderTable = ({fields, meta: { error, submitFailed }}) => {
        return (
            <GridTable
                columns={columns}
                data={fields}
                columnSpacing={3}
            />
        )
    }


    return (
        <Form onSubmit={handleSubmit}>
            <ContentContainer>
                <FieldArray name="parcels" component={renderTable} />
            </ContentContainer>
            <DetailFooter
                cancelTitle={globalMessages.back}
                submitTitle={globalMessages.next}
                onClose={onBack}
                //onSubmit={onSubmit}
            />
        </Form>
    )
}

SubsidyPage.propTypes = {

}

export default SubsidyPage