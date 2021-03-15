


export const getIfExists = (model, id, fallback=null) => {
    if (model.idExists(id)) {
        const { ref } = model.withId(id)    
        return {...ref}
    } else {
        return fallback
    }
}