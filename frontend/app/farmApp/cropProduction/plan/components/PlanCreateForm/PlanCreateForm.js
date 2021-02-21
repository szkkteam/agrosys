import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'
import { Formik, Field, Form, FieldArray } from 'formik';
import { useInjectSaga, useFormDispatch } from 'utils/hooks'
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

import { FieldArrayHelper } from 'components/Form'

import {
    Typography,

} from '@material-ui/core'

import { 
    CropProductionSeasonPanel as SeasonPanel
} from 'farmApp/cropProduction/components'

import EmptyGrowSeason from './EmptyGrowSeason'
import PanelActions from './PanelActions'

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
    growingSeasons: []
}

const SubmitButton = styled(PrimaryButton)`

    margin: 25px 0 0 auto;
    max-width: 220px;
`

const FormContent = ({
    values,
    handleSubmit,
    ...props
}) => {
    const [expanded, setExpanded] = useState({})
    const arrayRef = useRef();
    const panelRef = useRef();


    const growSeasonCreateDialog = usePlanCropDialog((payload) => {
        arrayRef.current.push(payload);
        panelRef.current.expand(values.growingSeasons.length)
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
            </PageHeader>  
                <FieldArray
                    name="growingSeasons"
                    render={arrayHelpers => (
                        <FieldArrayHelper
                            ref={arrayRef}
                            arrayHelpers={arrayHelpers}
                        >
                            <SeasonPanel
                                ref={panelRef}                                
                                action={
                                    hasGrowingSeason ? (
                                        <PrimaryActionButton
                                            title={messages.addCropTitle}
                                            onClick={createGrowSeason}
                                        />
                                    ) : null
                                }
                            >
                                {hasGrowingSeason ?
                                    values.growingSeasons.map((data, i) => (
                                        <SeasonPanel.Panel
                                            key={i}
                                            summary={
                                                <SeasonPanel.Summary />
                                            }
                                            actions={
                                                <PanelActions
                                                    onDelete={deleteGrowSeason(i)}
                                                    onEdit={editGrowSeason(data, i)}
                                                />

                                            }
                                            {...props}
                                        >
                                            <SeasonPanel.Detail />
                                        </SeasonPanel.Panel>
                                    ))
                                : <EmptyGrowSeason onCreate={createGrowSeason} />
                                }
                            </SeasonPanel>
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