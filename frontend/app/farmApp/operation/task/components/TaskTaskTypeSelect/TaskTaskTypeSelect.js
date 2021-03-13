import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from 'messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Formik, Field } from "formik";
import { TextField, Autocomplete } from 'components/FormB'
import { taskTypeOptions } from '../../constants'

const TaskTaskTypeSelect = ({
    name,
    label,
    ...props
}) => {
    const intl = useIntl()

    return (
        <Field 
            name={name}
            component={Autocomplete}
            formProps={{fullWidth: true}}
            //loading={false}
            disableClearable={true}
            options={taskTypeOptions}
            getOptionLabel={(option) => intl.formatMessage(option.title)}
            inputParams={{
                label
            }}  
            {...props}              
        />
    )
}

TaskTaskTypeSelect.propTypes = {

}

export default TaskTaskTypeSelect