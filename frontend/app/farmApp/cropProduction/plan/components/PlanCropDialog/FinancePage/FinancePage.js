import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field } from "formik";
//import { TextField } from 'formik-material-ui';
import { TextField, Checkbox } from 'components/FormB'
import * as Yup from 'yup';

import StepperNext from '../StepperNext'


import {
    Grid,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    //Checkbox,
    TextField as MuiTextField,
    Typography,
    InputAdornment,

    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core'

import schema from './schema'

const InnerContainer = styled.div`
    padding: 0px 25px;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

//const mergedSchema = () => schema.concat(PlanCropTaskSection.schema)

const TableSummary = ({

}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Crop</TableCell>
                        <TableCell>Total yield</TableCell>
                        <TableCell>Yield for sell</TableCell>
                        <TableCell>Yield for own</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>Őzi búza</TableCell>
                    <TableCell>19t</TableCell>
                    <TableCell>12t</TableCell>
                    <TableCell>7t</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={2}>Income per yield</TableCell>
                    <TableCell>3700</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total income</TableCell>
                    <TableCell>42000</TableCell>
                </TableRow>                  
            </TableBody>
            </Table>
            
        </TableContainer>
    )
}

const PlanCropFinanceSection = ({
    values,
    setFieldValue,
    ...props
}) => {
    const [yieldOwnPurpose, setYieldOwnPurpose] = useState(false)

    const handleChange = (event) => {
        const checked = event.target.checked
        if (checked) {
            setFieldValue("income", "")
        }
        setYieldOwnPurpose(checked)
    }
    console.debug("values: ", values)
    return (
        <Grid container spacing={4}>
            <Grid container item xs={12} spacing={4} justify="flex-start" >     
                <Grid container item xs={8} alignItems="center">
                    <Typography variant="body1" component="p">
                        Specify the possible income for your crop. You have to set the crop selling price per tonns and the rest will be calculated for your. If you would liek to use the yield for your own purpose please select the corresponding field.
                    </Typography>
                </Grid>
                             
                <Grid container item xs={8} spacing={4} alignItems="center">
                    <Grid item xs={2}>
                        <Typography variant="body1" component="p">
                        {_.get(values, "mainCrop.cropType.title") || "Őszi búza"}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="income"
                            disabled={yieldOwnPurpose}
                            component={TextField}
                            label="Crop price per tonn"
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                    $
                                </InputAdornment>
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                            <FormGroup>
                            <Field name={`ownPurpose`}
                                component={Checkbox}
                                onChange={handleChange}
                                label="Use for own purpose" 
                            />                              
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                 
            </Grid>
            <Grid container item xs={12} justify="center">
                <Grid item xs={6}>
                    
                </Grid>            
            </Grid>
            <Grid container item xs={12} justify="center">
                         
            </Grid>
        </Grid>                
    )
}
/*
<Grid container item xs={8} alignItems="center">
                    <Typography variant="body1" component="p">
                        Summary
                    </Typography>
                    <TableSummary />
                </Grid>  
*/

const FinancePage = ({
    ...props
}) => {

    return (
        <>          
            <InnerContainer>
                <PlanCropFinanceSection
                    {...props}
                />
            </InnerContainer>
            <StepperNext
                title={globalMessages.next}
            />
        </>     
    )
}

FinancePage.propTypes = {

}

FinancePage.initialValues = {
    income: "",
    ownPurpose: false,
}

FinancePage.schema = schema

export default FinancePage