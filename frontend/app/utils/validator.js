

export const syncValidator = (schema) => formValues => {
    console.debug("formValues: ", formValues)
    try {
        schema.validateSync(formValues, { abortEarly: false })
        return {}
    } catch (errors) {
        if (!errors?.inner) return {}

        const retVal = errors.inner.reduce(
            (errors, err) => ({
                ...errors,
                [err.path]: err.message
            })
        , {})
        console.debug("Errors: ", retVal)
        return retVal

    }
}