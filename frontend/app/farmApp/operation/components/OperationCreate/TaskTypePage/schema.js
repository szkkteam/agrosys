import * as Yup from 'yup';
import globalMessages from 'messages'

export const fieldObject = Yup.object().shape({   
    cropPlan: Yup.object().required(),
    variant: Yup.string(),
    yield: Yup.number().required().positive(), 
})

export default Yup.object().shape({
    fields: Yup.array(fieldObject)
});