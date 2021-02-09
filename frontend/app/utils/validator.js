

export const syncValidator = (schema) => formValues => {
    try {
        schema.validateSync(formValues, { abortEarly: false })
        return {}
    } catch (errors) {
        const retVal = errors.inner.reduce(
            (errors, err) => ({
                ...errors,
                [err.path]: err.message
            })
        , {})
        return retVal
    }
}