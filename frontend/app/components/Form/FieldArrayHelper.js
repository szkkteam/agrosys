import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray } from 'formik';



const FieldArrayHelper = forwardRef(({
    //name,
    //values,
    children,
    ...props
}, ref) => {
    const { arrayHelpers } = props;

    useImperativeHandle(ref, () => ({
        push(value) {
            arrayHelpers.push(value);
        },
        remove(index) {
            arrayHelpers.remove(index);
        },
        replace(index, value) {
            arrayHelpers.replace(index, value);
        }
    }));

    return (
        <>
            {children}
        </>
    )
})

export default FieldArrayHelper