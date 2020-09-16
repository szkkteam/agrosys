import { createSelector } from 'reselect'
import {
    deNormalizeTemplates
} from 'template/schemas'

import {
    selectUserTemplatesById,
    selectUserTemplateIds,
} from 'template/reducers/userTemplates'

import {
    selectDefaultTemplatesById,
    selectDefaultTemplateIds,
} from 'template/reducers/defaultTemplates'

export const getUserTemplatesDenormalized = createSelector(
    [
        selectUserTemplateIds,
        selectUserTemplatesById,
    ],
    (templateIds, templates) => {
        return deNormalizeTemplates({ ids: templateIds, ...{entities: {templates}}})
    }
)

export const getDefaultTemplatesDenormalized = createSelector(
    [
        selectDefaultTemplateIds,
        selectDefaultTemplatesById,
    ],
    (templateIds, templates) => {
        return deNormalizeTemplates({ ids: templateIds, ...{entities: {templates}}})
    }
)

export const getUserDefaultTemplatesGrouped = createSelector(
    [
        getUserTemplatesDenormalized,
        getDefaultTemplatesDenormalized,
    ],
    (userTemplates, defaultTemplates) => {
        const groupedUserTemplates = userTemplates.map((template, i) => (
            {
                ...template,
                groupBy: "User Templates"
            }
        ))
        const groupedDefaultTemplates = defaultTemplates.map((template, i) => (
            {
                ...template,
                groupBy: "Default Templates"
            }
        ))
        return _.concat(groupedDefaultTemplates, groupedUserTemplates)
    }
)