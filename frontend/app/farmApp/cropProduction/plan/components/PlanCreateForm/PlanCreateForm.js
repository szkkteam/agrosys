import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'
import { Formik, Field, Form, FieldArray } from 'formik';
import { usePlanCropDialog } from '../../hooks'

import {
    PageHeader,
    PageContent,
    PageToolbar,
    PrimaryActionButton,
    PrimaryButton,
    SecondaryButton,
} from 'components'

import { FieldArrayHelper } from 'components/Form'

import {
    FullscreenFormLayout,
    ExpandPanel
} from 'farmApp/components'

import {
    Button,
    Typography,
    IconButton,
    Collapse,

} from '@material-ui/core'

import PlanCropPanelSummary from '../PlanCropPanelSummary/PlanCropPanelSummary'
import PlanCropPanelDetail from '../PlanCropPanelDetail/PlanCropPanelDetail'

import EmptyGrowSeason from './EmptyGrowSeason'

const Spacer = styled.div`
    flex-grow: 1;
`

const StyledForm = styled(Form)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const AddParcelButton = styled(PrimaryActionButton)`
    max-width: 220px;
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
    growingSeasons: [{}, {}, {}]
}

const CropAccordion = ({
    //expanded,
    onDelete,
    onEdit,
}) => {
    const [expanded, setExpanded] = useState(true)

    const handleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <ExpandPanel        
            expanded={expanded}
            onExpandChange={handleExpanded}
            actionDisable
            summary={(props) => (
                <PlanCropPanelSummary {...props} />)
            }
            actions={
                <>
                    <SecondaryButton
                        //size="small"
                        onClick={onDelete}
                        title={globalMessages.delete}
                    />
                    <PrimaryButton 
                        //size="small"
                        onClick={onEdit}
                        title={globalMessages.edit}
                    />
                </>
            }
        >
                <div>
                    TODO: Place a stepper here. Also an edit/delete maybe a more button. At the bottom of the detail maybe place a save button?

                </div>
                <PlanCropPanelDetail />                
        </ExpandPanel>
        
    )
}

const FormContent = ({
    values,
    ...props
}) => {

    const arrayRef = useRef();

    const growSeasonCreateDialog = usePlanCropDialog((payload) => {
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
        <StyledForm>
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
                                <CropAccordion key={i}
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
        </StyledForm>
    )
}

const PlanCreateForm = ({

}) => {


    return (
        <PageContent spacing={[1, 2]} overflow>
            <Formik
                initialValues={initialValues}
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