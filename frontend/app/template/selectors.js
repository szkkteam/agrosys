import { createSelector } from 'reselect'
import {
    deNormalizeTemplates
} from 'template/schemas'

import {
    selectTemplatesById,
    selectTemplateIds,
} from 'template/reducers/templates'

const getUserTemplates = (templates) => {
    console.log("getUserTemplates-templates: ", templates)
    // FIXME: Currently farm is not in objects.
    //return templates.filter((x => 'farms' in x))
    return templates
}

export const getUserTemplatesDenormalized = createSelector(
    [
        selectTemplateIds,
        selectTemplatesById,
    ],
    (templateIds, templates) => {
        const denormalizedTemplates = deNormalizeTemplates({ ids: templateIds, ...{entities: {templates}}})
        console.log("getUserTemplatesDenormalized-denormalizedTemplates: ", denormalizedTemplates)
        return getUserTemplates(denormalizedTemplates)
    }
)