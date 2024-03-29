import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import { spacing } from '@material-ui/system'
import { Formik, Field, Form, FieldArray } from 'formik';
import { TextField, Number, Autocomplete } from 'components/FormB'
import { useFormDispatch, useInjectSaga, useConverter } from 'utils/hooks'

import { useDrawDialog } from '../../hooks'
import { createField } from '../../actions'

import {
    PrimaryButton,
    PrimaryActionButton
} from 'components'

import { FieldArrayHelper } from 'components/Form'

import { 
    SimpleTable
} from 'farmApp/components'

import {
    Grid,
    Paper,
    TableCell,
    TableRow,
    Typography,
    IconButton,
} from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import FieldListItemBoundary from '../FieldListItemBoundary/FieldListItemBoundary'

const AddFieldRow = ({
    onClick,
}) => {
    
    return (
        <TableRow>
            <TableCell style={{borderBottom: "none"}}>
                <PrimaryActionButton
                    title={messages.addField}
                    onClick={onClick}
                />                 
            </TableCell>
        </TableRow>
    )
}

const ownership = [
    "Tulajdon",
    "Földhaszonbérlet",
    "Szivességi földhasználat",
    "Vagyonkezelő",
    "Közeli hozzátartozó",
    "Mindezek vegyesen",
    "Egyéb",
]

const fieldInitialValue = {
    title: "",
    area: "",
    geometry: null,
    lpis: {
        ownership: "",
        cadastralPlot: "",
        meparId: "",
    }
}

const FieldGrid = ({
    startDraw,
    values,
    ...props
}) => {
    const intl = useIntl()
    const arrayRef = useRef();
    const history = useHistory()
    const converter = useConverter('area')
    

    const pushDialogResult = (payload) => {
        payload.map(field => arrayRef && arrayRef.current?.push({...fieldInitialValue, ...field}) )
    }

    const drawDialog = useDrawDialog(pushDialogResult)


    const drawDialogExit = useDrawDialog(pushDialogResult, () => {
        history.goBack()
    })

    const handleAddField = () => {
        drawDialog()
    }

    useEffect(() => {
        if (startDraw) {
            drawDialogExit()
        }
    }, [])


    const columns = [
        {
            title: intl.formatMessage(messages.boundary),
            render: (row, i) => (
                <FieldListItemBoundary geometry={row.geometry}/>
            ),
            
        },
        {
            title: intl.formatMessage(messages.area),
            render: (row, i) => (
                <Typography variant="body2">
                    {converter(row.area)}
                </Typography>
                )
        },
        {
            title: intl.formatMessage(messages.title),
            render: (row, i) => (
                <Field
                    name={`fields[${i}].title`}
                    component={TextField}
                    variant="outlined"
                    label={intl.formatMessage(messages.title)}
                />
            )
        },
        {
            title: intl.formatMessage(messages.ownership),
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.ownership`}
                    component={Autocomplete}
                    variant="outlined"
                    label={intl.formatMessage(messages.ownership)}
                    formProps={{fullWidth: true}}
                    disableClearable={true}
                    options={ownership}
                      
                />
            )
        },
        {
            title: intl.formatMessage(messages.cadastralPlot),
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.cadastralPlot`}
                    component={TextField}
                    variant="outlined"
                    label={intl.formatMessage(messages.cadastralPlot)}
                />
            )
        },
        {
            title: intl.formatMessage(messages.lpis),
            render: (row, i) => (
                <Field
                    name={`fields[${i}].lpis.meparId`}
                    component={TextField}
                    variant="outlined"
                    label={intl.formatMessage(messages.lpisLabel)}
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
        {
            
        }
    ]

    return (
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
                                <AddFieldRow onClick={handleAddField} />
                            </FieldArrayHelper>  
                        )
                    }
                />
            )}
        />
    )
}


const FieldCreate = ({
    startDraw,
    initialValues,
    ...props
}) => {
    const submit = useFormDispatch();
    useInjectSaga(require('farmApp/resource/field/sagas/createField'))

    return (
        <Formik
            initialValues={{
                fields: [],
                ...initialValues,
                _error: "",
            }}
            onSubmit={submit(createField)}
        >
            {({isSubmitting, dirty, errors, ...props}) => (
                <Form>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper>
                                <FieldGrid  
                                    startDraw={startDraw}
                                    {...props}
                                />
                            </Paper>

                        </Grid>    
                        <Grid item xs={12}>
                            <PrimaryButton
                                type="submit"
                                title={globalMessages.create}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

FieldCreate.propTypes = {

}

export default FieldCreate