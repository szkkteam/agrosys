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



const SubsidySection = ({
    values,
    ...props
}) => {
   
    const columns = [
        {
            title: 'Field',
            render: (row, i) => (
                <FieldListItem
                    disableAction={true}
                    {... values.fields && values.fields.length? {id: values.fields[i].fieldId} : {}} 
                />
            ) 
        },
        {
            title: 'Table number',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.tableId`}
                    component={TextField}
                    label="Table number"
                />
            )
        },
        {
            title: 'AKG codes',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.akg`}
                    component={TextField}
                    label="AKG"
                />
            )
        },
        {
            title: 'KET/KAT',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.ketkat`}
                    component={TextField}
                    label="KE/KAT"
                />
            )
        },
        {
            title: 'Subsidies',
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.subsidies`}
                    component={TextField}
                    label="Subsidies"
                />
            )
        },
        {
            title: '',
            render: (row, i, props) => {
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
                            </>
                        )
                    }
                />
            )}
        />
           
    )
}


const SubsidyPage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <SubsidySection
                    {...props}
                />                
            </InnerContainer>
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

SubsidyPage.propTypes = {

}


SubsidyPage.initialValues = {
   
}

SubsidyPage.schema = schema

export default SubsidyPage