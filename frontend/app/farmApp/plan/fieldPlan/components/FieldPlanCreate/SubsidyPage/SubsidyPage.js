import React, { useState, useMemo, useRef, useCallback } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field, Form, FieldArray } from 'formik';
//import { TextField } from 'formik-material-ui';
import { TextField } from 'components/FormB'
import { spacing } from '@material-ui/system';
import * as Yup from 'yup';

import { 
    PageHeader,
    PrimaryActionButton
} from 'components'

import { FieldArrayHelper } from 'components/Form'

import { 
    SimpleTable
} from 'farmApp/components'

import {
    FieldListItem,
    FieldSideSelector
} from 'farmApp/resource/field/components'

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import {
    TableCell,
    TableRow,
    IconButton,
    Grid
} from '@material-ui/core'

import FormFooter from '../FormFooter'

import schema from './schema'


const Section = styled.div`
    ${spacing}
`

const fieldInitialValue = {
    crop: {
        variant: "",
        yield: "",        
    },
    lpis: {
        cropCode: "",
        tableId: "",
        akg: "",
        ketkat: "",
        subsidies: ""
    }
}


const AddFieldRow = ({
    onClick,
}) => {
    
    return (
        <TableRow>
            <TableCell style={{borderBottom: "none"}}>
                <PrimaryActionButton
                    title="Add field"
                    onClick={onClick}
                />                 
            </TableCell>
        </TableRow>
    )
}


const SubsidyPage = ({
    values,
    ...props
}) => {
    const arrayRef = useRef();
    const [open, setOpen] = useState(false)

    const { fields = []} = values

    const selectedFields = useMemo(() => fields.map(x => x.fieldId), [fields])

    const handleAddfield = useCallback((fieldId, selected) => {
        if (selected) {
            // TODO: Push initial shape
            arrayRef && arrayRef.current.push({...fieldInitialValue, fieldId})
        } else {
            const index = _.findIndex(fields, x => x.fieldId === fieldId)
            arrayRef && arrayRef.current.remove(index)
        }
    }, [])  


    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = useCallback(() => {
        setOpen(false)
    }, [])


    const columns = [
        {
            title: 'Field',
            render: (row, i) => (
                <FieldListItem
                    disableAction
                    disableButton
                    {... values.fields && values.fields.length? {id: values.fields[i].fieldId} : {}} 
                />
            )
        },
        {
            title: 'Table number',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.cropCode`}
                    component={TextField}
                    variant="outlined"
                    label="CropCode"
                    />
            )
        },
        {
            title: 'Crop code',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].crop.variant`}
                    component={TextField}
                    variant="outlined"
                    label="Variant"
                />
            )
        },
        {
            title: 'AKG',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].crop.yield`}
                    component={TextField}
                    variant="outlined"
                    label="Yield"
                />
            )
        },
        {
            title: 'Subsidies',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].crop.yield`}
                    component={TextField}
                    variant="outlined"
                    label="Yield"
                />
            )
        },
        {
            title: 'KET/KAT',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].crop.yield`}
                    component={TextField}
                    variant="outlined"
                    label="Yield"
                />
            )
        },
        
        {
            title: '',
            render: (row, i, props) => {
                const handleDelete = () => {
                    arrayRef && arrayRef.current.remove(i)   
                }
                return (
                    <IconButton
                        onClick={handleDelete}
                    >
                        <RemoveCircleIcon />
                    </IconButton>
                )
            }
        },
    ]



    return (
        <>          
            <FieldSideSelector 
                open={open}
                selected={selectedFields}
                onSelected={handleAddfield}
                onClose={handleDrawerClose}
            />
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        title="Adjust the field parameters"
                        subheader="Every detail will be considered in the application so please be accurate."
                    />
                    
                </Grid>
                <SimpleTable
                    columns={columns}
                    data={values.fields}
                    render={({data, columns}) => (
                        <FieldArray
                            name="fields"
                            render={arrayHelpers => (
                                    <FieldArrayHelper
                                        ref={arrayRef}
                                        arrayHelpers={arrayHelpers}
                                    >
                                        {SimpleTable.renderRows({data, columns, arrayHelpers})}
                                    </FieldArrayHelper>  
                                )
                            }
                        />
                    )}
                />
                
            </Grid>
            <FormFooter
                title={globalMessages.next}
            />
        </>     
    )
}

SubsidyPage.propTypes = {

}


SubsidyPage.initialValues = {
    title: "",
    cropType: "",
    expectedYield: "",
}

SubsidyPage.schema = schema

export default SubsidyPage