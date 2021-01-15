import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { FieldArray } from 'redux-form'

import { 
    HiddenField,
    TextField,
    TextComponent,
    SearchSelectField,
    SearchSelectComponent
} from 'components/Form'

import { 
    Table,
    TableHeader,
} from 'components/Table'

import { DetailFooter } from 'farmApp/components/Detail'

import GridTable from 'farmApp/components/GridTable'

import {
    FieldListItem,
    FieldSideSelector
} from 'farmApp/production/field/components'

import DeleteIcon from '@material-ui/icons/Delete';

import {
    Grid,
    IconButton,
    Button,
} from '@material-ui/core'

import PlanAddParcelButton from '../../../PlanAddParcelButton'

const ContentContainer = styled.div`
    padding: 10px 15px;
    flex-grow: 1;
`


const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
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

class CropVariantPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            drawerOpen: false,
        }

    }

    handleSelectParcel = (parcelId, selected) => {
        if (selected) {
            this.props.array.push('parcels', { parcelId })
        } else {
            const index = _.findIndex(parcels, x => x.parcelId === parcelId)
            this.props.array.remove('parcels', index)
        }
    }

    handleDeleteParcel = (index) => () => {
        this.props.array.remove('parcels', index)
    }

    handleDrawerClose = () => {
        this.setState({
            drawerOpen: false
        })
    }

    handleDrawerOpen = () => {
        this.setState({
            drawerOpen: true
        })
    }


    renderTable = ({fields, meta: { error, submitFailed }}) => {
        const { parcels } = this.props
        const columns = [
            {title: 'Parcels', size: 1.5, render: (field, i) => 
                <FieldListItem 
                    data={parcels ? {id: parcels[i].parcelId} : null}
                />
            },
            {title: 'Variant', render: (field, i) => <SearchSelectField name={`${field}.crop.variant`}
                                                        label="Variant"
                                                        disableClearable={true}
                                                        formProps={{fullWidth: true}}
                                                        options={variants}
                                                        //idAccessor={(o) => o.id}
                                                        groupBy={(option) => option.category}
                                                        getOptionLabel={(option) => option.title}
                                                    />
            },
            {title: 'Planned yield' , render: (field, i) => <TextField name={`${field}.crop.yield`}
                                                                label="Planned yield"
                                                                formProps={{fullWidth: true}}
                                                            />
            },
            {title: 'Seed', render: (field, i) => <SearchSelectField name={`${field}.crop.seed`}
                                                    label="Szaporítóanyag"
                                                    disableClearable={true}
                                                    formProps={{fullWidth: true}}
                                                    options={variants}
                                                    //idAccessor={(o) => o.id}
                                                    groupBy={(option) => option.category}
                                                    getOptionLabel={(option) => option.title}
                                                />
            },
            {title: 'Crop code', render: (field, i) => <SearchSelectField name={`${field}.crop.cropCode`}
                                                    label="Crop code"
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
            >
                <PlanAddParcelButton 
                    onClick={this.handleDrawerOpen}
                />
            </GridTable>
        )
    }


    render() {
        const {
            onBack,
            onSubmit,
            handleSubmit,
            data,
            children,
            openDrawer,    
            array,
            parcels = [],
            ...props
        } = this.props

        const {
            drawerOpen
        } = this.state


        const selectedParcels = parcels.map(x => x.parcelId)

        return (
            <Form onSubmit={handleSubmit}>
                <ContentContainer>
                    <FieldSideSelector 
                        open={drawerOpen}
                        selected={selectedParcels}
                        onSelected={this.handleSelectParcel}
                        onClose={this.handleDrawerClose}
                    />

                    <HiddenField name="cropId" />
                    <HiddenField name="productionType" />

                    <FieldArray name="parcels" component={this.renderTable} />
                    
                </ContentContainer>
                <DetailFooter
                    cancelTitle={globalMessages.cancel}
                    submitTitle={globalMessages.next}
                    onClose={onBack}
                    //onSubmit={onSubmit}
                />
            </Form>
        )
    }
}

/*
CropVariantPage.propTypes = {

}
*/

export default CropVariantPage