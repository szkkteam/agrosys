
export const syncValidator = (schema) => formValues => {
    //console.debug("formValues: ", formValues)
    try {
        schema.validateSync(formValues, { abortEarly: false })
        return {}
    } catch (errors) {
        if (!errors?.inner) return {}
        let retVal = {}
        errors.inner.forEach((err) => {
            _.set(retVal, err.path, err.message)
        })
        
        //console.debug("Errors: ", retVal)
        return retVal

    }
}