import React, { useState, useMemo, useRef, useCallback } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field, Form, FieldArray } from 'formik';
//import { TextField } from 'formik-material-ui';
import { TextField, Number } from 'components/FormB'
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

import {
    CropPlanSelect
} from 'farmApp/plan/cropPlan/components'

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
    cropPlan: "",
    variant: "",
    yield: "",        
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


const FieldPage = ({
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
            title: 'Crop',
            render: (row, i) => (
                <CropPlanSelect
                    name={`fields[${i}].cropPlan`}
                    variant="outlined"
                    label="Crop plan"
                />
            )
        },
        {
            title: 'Vaiant',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].variant`}
                    component={TextField}
                    variant="outlined"
                    label="Variant"
                />
            )
        },
        {
            title: 'Yield',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].yield`}
                    component={Number}
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
                        title="Select your fields where you want to grow"
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
                                        <AddFieldRow onClick={handleDrawerOpen} />
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

FieldPage.propTypes = {

}


FieldPage.initialValues = {
    title: "",
    cropType: "",
    expectedYield: "",
}

FieldPage.schema = schema

export default FieldPage