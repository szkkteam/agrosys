import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field, FieldArray } from "formik";
//import { TextField } from 'formik-material-ui';
import { TextField } from 'components/FormB'
import * as Yup from 'yup';

import { 
    PrimaryActionButton
} from 'components'

import { 
    SimpleTable
} from 'farmApp/components'

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import {
    TableCell,
    TableRow,
    IconButton,
} from '@material-ui/core'

import {
    FieldListItem,
    FieldSideSelector
} from 'farmApp/resource/field/components'

import StepperNext from '../StepperNext'

import schema from './schema'

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const AddFieldRow = ({
    fields=[],
    arrayHelper
    //AddField,
}) => {
    const [open, setOpen] = useState(false)

    const selectedFields = fields.map(x => x.fieldId)

    const handleAddfield = (fieldId, selected) => {
        if (selected) {
            // TODO: Push initial shape
            arrayHelper.push({fieldId})
        } else {
            const index = _.findIndex(fields, x => x.fieldId === fieldId)
            arrayHelper.remove(index)
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <TableRow>
            <TableCell style={{borderBottom: "none"}}>
                <PrimaryActionButton
                    title="Add field"
                    onClick={handleDrawerOpen}
                /> 
                <FieldSideSelector 
                    open={open}
                    selected={selectedFields}
                    onSelected={handleAddfield}
                    onClose={handleDrawerClose}
                />
            </TableCell>
        </TableRow>
    )
}

const FieldSection = ({
    values,
    ...props
}) => {
   
    const columns = [
        {title: 'Field', render: (row, i) => <FieldListItem />},
        {title: 'Vaiant', render: (row, i) => <Field
                                                name={`fields[${i}].crop.variant`}
                                                component={TextField}
                                                label="Variant"
                                                />
                                        },
        {title: 'Yield', render: (row, i) => <Field
                                                name={`fields[${i}].crop.yield`}
                                                component={TextField}
                                                label="Yield"
                                              />
                                        },
        {title: 'Crop code', render: (row, i) => <Field
                                        name={`fields[${i}].lpis.cropCode`}
                                        component={TextField}
                                        label="CropCode"
                                      />
                                },
        {title: '', render: (row, i, props) => {
            
            const handleDelete = () => {
                props.arrayHelper.remove(i)   
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
        <SimpleTable
            columns={columns}
            data={values.fields}
            render={({data, columns}) => (
                <FieldArray
                    name="fields"
                    render={arrayHelper => (
                            <>
                                {SimpleTable.renderRows({data, columns, arrayHelper})}
                                <AddFieldRow arrayHelper={arrayHelper} fields={values.fields}/>
                            </>
                        )
                    }
                />
            )}
        />
           
    )
}


const FieldPage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <FieldSection
                    {...props}
                />                
            </InnerContainer>
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

FieldPage.propTypes = {

}


FieldPage.initialValues = {
   
}

FieldPage.schema = schema

export default FieldPage