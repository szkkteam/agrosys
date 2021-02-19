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

import EmptyGrowSeason from './EmptyGrowSeason'
import GrowSeasonAccordion from './GrowSeasonAccordion'

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

    const handleExpandChange = (i) => () => {
        if (expanded[i] !== undefined) setExpanded({})
        else setExpanded({[i]: true})
    }

    const growSeasonCreateDialog = usePlanCropDialog((payload) => {
        setExpanded({
            [values.growingSeasons.length]: true
        })
        arrayRef.current.push(payload);
    })

    const growSeasonEditDialog = usePlanCropDialog((payload, status, index) => {
        arrayRef.current.replace(index, payload)
    })

    const createGrowSeason = () => {
        growSeasonCreateDialog();
    }

    const deleteGrowSeason = (index) => () => {
        arrayRef.current.remove(index);
    }

    const editGrowSeason = (data, index) => () => {
        growSeasonEditDialog({initialValues: data}, index)
    }

    const hasGrowingSeason = values.growingSeasons && values.growingSeasons.length

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
            <PageToolbar>
                <Flex>
                    <Typography variant="h6">
                        Season (2019 Szeptember 9 - 2020 Január 10)
                    </Typography>
                    <Spacer />
                    {hasGrowingSeason? (
                        <PrimaryActionButton
                            title="Add crop"
                            onClick={createGrowSeason}
                        />                    
                    ) : (
                        null
                    )}
                </Flex>
            </PageToolbar>     
            <Section spacing={2}>
            </Section>
            <FieldArray
                name="growingSeasons"
                render={arrayHelpers => (
                    <FieldArrayHelper
                        ref={arrayRef}
                        arrayHelpers={arrayHelpers}
                    >
                        {hasGrowingSeason ? 
                            values.growingSeasons.map((data, i) => (
                                <GrowSeasonAccordion key={i}
                                    expanded={expanded[i] !== undefined}
                                    onExpandChange={handleExpandChange(i)}
                                    onDelete={deleteGrowSeason(i)}
                                    onEdit={editGrowSeason(data, i)}
                                    index={i}
                                />
                            ))
                        : <EmptyGrowSeason onCreate={createGrowSeason} />
                        }
                    </FieldArrayHelper>
                )}

            />
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