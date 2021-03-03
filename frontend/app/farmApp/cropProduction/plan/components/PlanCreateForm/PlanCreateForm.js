import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'
import { Formik, Field, Form, FieldArray } from 'formik';
import { useInjectSaga, useFormDispatch, useDateFnsLocale } from 'utils/hooks'
import { useDispatch } from 'react-redux'
import { usePlanCropDialog } from '../../hooks'
import { createPlan } from '../../actions'

import {
    PageHeader,
    PageContent,
    PageToolbar,
    PrimaryActionButton,
    PrimaryButton
} from 'components'
import { TextField } from 'components/FormB'
import { ExpandPanel } from 'farmApp/components'

import { FieldArrayHelper } from 'components/Form'

import {
    Typography,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core'

import { 
    CropProductionSeasonPanel as SeasonPanel
} from 'farmApp/cropProduction/components'

import EmptyGrowSeason from './EmptyGrowSeason'
import PanelActions from './PanelActions'
import CropDetail from './CropPanelDetail'
import CropSummary from './CropPanelSummary'

const Spacer = styled.div`
    flex-grow: 1;
`

const StyledForm = styled(Form)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`


const Flex = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const Section = styled.div`
    ${Spacing}
`

const initialValues = {
    title: "",
    growingSeasons: [{}]
}

const SubmitButton = styled(PrimaryButton)`

    margin: 25px 0 0 auto;
    max-width: 220px;
`

const SeasonPeriod = ({
    date,
    ...props
}) => {
    const { locale }  = useDateFnsLocale() 
    const { start, end } = date   
    return (
        <>
            {`(${format(start, 'yyyy, MMMM', {locale})} - ${format(end, 'yyyy, MMMM', {locale})})`}
        </>
    )
}

const FormContent = ({
    values,
    handleSubmit,
    ...props
}) => {
    const arrayRef = useRef();
    const panelRef = useRef();


    const growSeasonCreateDialog = usePlanCropDialog((payload) => {
        arrayRef.current.push(payload);
        panelRef.current && panelRef.current.expand(values.growingSeasons.length)
    })

    const growSeasonEditDialog = usePlanCropDialog((payload, status, index) => {
        arrayRef.current.replace(index, payload);
    })

    const createGrowSeason = () => {
        growSeasonCreateDialog();
    }

    const deleteGrowSeason = (index) => () => {
        arrayRef.current.remove(index);
    }

    const editGrowSeason = (data, index) => () => {
        growSeasonEditDialog({initialValues: data}, index);
    }

    useEffect(() => {
        createGrowSeason()
    }, [])

    const hasGrowingSeason = values.growingSeasons && values.growingSeasons.length;

    return (
        <StyledForm
            onSubmit={handleSubmit}
        >
            <PageHeader
                spacing={[3,2]}
                title="Create new season plan"
                subheader="Add crops to your season"
            >        
                <Spacer />
                { hasGrowingSeason ? (
                    <PrimaryActionButton
                        title={messages.addCropTitle}
                        onClick={createGrowSeason}
                    />
                ) : null }
            </PageHeader>  
                <FieldArray
                    name="growingSeasons"
                    render={arrayHelpers => (
                        <FieldArrayHelper
                            ref={arrayRef}
                            arrayHelpers={arrayHelpers}
                        >
                            {hasGrowingSeason ? (    
                                <Card >
                                    <CardHeader
                                        title={
                                            <Field
                                                name="title"
                                                component={TextField}
                                                label="Season title"
                                                variant="filled"
                                            />
                                        }
                                        subheader={
                                            <SeasonPeriod
                                                // TODO: Do some magic to parse all dates and find the min start and max end
                                                date={{start: new Date(2021,1,12), end: new Date(2021,7,8)}}
                                            />
                                        }
                                    />           
                                    <CardContent>
                                        <ExpandPanel
                                            ref={panelRef}                                                                
                                        >
                                            {values.growingSeasons.map((data, i) => (
                                                <SeasonPanel.Panel
                                                    key={i}
                                                    summary={
                                                        <CropSummary
                                                            date={{start: new Date(2021,1,12), end: new Date(2021,7,8)}}
                                                        />
                                                    }
                                                    actions={
                                                        <PanelActions
                                                            onDelete={deleteGrowSeason(i)}
                                                            onEdit={editGrowSeason(data, i)}
                                                        />

                                                    }
                                                    {...props}
                                                >
                                                    <CropDetail

                                                    />
                                                </SeasonPanel.Panel>
                                            ))}
                                        </ExpandPanel>
                                    </CardContent>                 
                                </Card>
                            ) : (
                                <EmptyGrowSeason onCreate={createGrowSeason} />
                            )}
                        </FieldArrayHelper>
                    )}

                />

            <Spacer />
            {hasGrowingSeason ? (
                <SubmitButton
                    type="submit"
                    title={globalMessages.submit}
                />
            ) : null}
        </StyledForm>
    )
}

const PlanCreateForm = ({

}) => {
    useInjectSaga(require('../../sagas/createPlan'))
    const submit = useFormDispatch()


    return (
        <PageContent spacing={[1, 2]} overflow>
            <Formik
                initialValues={initialValues}
                onSubmit={submit(createPlan)}
                //onSubmit={createPlan}
            >
                {(props) => (
                    <FormContent 
                        {...props}
                    />
                )}
            </Formik>
        </PageContent>
    )
}

PlanCreateForm.propTypes = {

}

export default PlanCreateForm