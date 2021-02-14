import * as Yup from 'yup'
import messages from './messages';

export const fieldSchema = Yup.object({
    //geometry: Yup.object().required(),
    area: Yup.number().required(messages.areaMissing),
    title: Yup.string().required(messages.titleMissing),
    lpis: Yup.object().shape({
        ownership: Yup.string().required(messages.ownershipMissing),
        cadastralPlot: Yup.string(),
        meparId: Yup.string().required(messages.meparIdMissing)
    })
})

export const schema = Yup.object({
    fields: Yup.array().of(fieldSchema)
})
