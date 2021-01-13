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

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const variants = [
    {id: 1, title: "ABONY", },
    {id: 2, title: "ACTIVUS", },
]


const CropVariantPage = ({
    onBack,
    onSubmit,
    handleSubmit,
    data,
    children,
    openDrawer,    
    array,
    parcels = [],
    ...props
}) => {

    console.debug("Form props: ", props)
    const [drawerOpen, setDrawerOpen] = useState(false)


    const handleSelectParcel = (parcelId, selected) => {
        if (selected) {
            array.push('parcels', { parcelId })
        } else {
            const index = _.findIndex(parcels, x => x.parcelId === parcelId)
            array.remove('parcels', index)
        }
    }

    const handleDeleteParcel = (index) => () => {
        array.remove('parcels', index)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    useEffect(() => {
        console.debug("mount")
        return () => {
            console.debug("unMount")
        }
    })

    const columns = [
        {title: 'Parcels', size: 1.5, render: (rowData) => <FieldListItem data={rowData} />},
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
                onClick={handleDeleteParcel(index)}
            >
                <DeleteIcon />
            </IconButton>)
            }
        
    ]


    const renderTable = ({fields, meta: { error, submitFailed }}) => {
        return (
            <>
                <GridTable
                    columns={columns}
                    data={fields}
                    columnSpacing={3}
                >
                    <PlanAddParcelButton 
                        onClick={handleDrawerOpen}
                    />
                </GridTable>
            </>
        )
    }

    const selectedParcels = useMemo(() => parcels.map(x => x.parcelId), [parcels])

    return (
        <Form onSubmit={handleSubmit}>
            <ContentContainer>
                <FieldSideSelector 
                    open={drawerOpen}
                    selected={selectedParcels}
                    onSelected={handleSelectParcel}
                    onClose={handleDrawerClose}
                />

                <HiddenField name="cropId" />
                <HiddenField name="productionType" />

                <FieldArray name="parcels" component={renderTable} rerenderOnEveryChange={false}/>
                
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

CropVariantPage.propTypes = {

}

export default CropVariantPage