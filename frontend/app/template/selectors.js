import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

import {
    deNormalizeTemplates
} from 'template/schemas'

import {
    selectTasksById
} from 'task/reducers/tasks'

import {
    selectUserTemplatesById,
    selectUserTemplateIds,
    selectUserSelectedTemplateId,
} from 'template/reducers/userTemplates'

import {
    selectDefaultTemplatesById,
    selectDefaultTemplateIds,
} from 'template/reducers/defaultTemplates'

import { convertToDateObject, orderTasks } from 'task/utils'

export const getUserTemplatesDenormalized = createSelector(
    [
        selectUserTemplateIds,
        selectUserTemplatesById,
        selectTasksById,
    ],
    (templateIds, templates, tasks) => {
        return deNormalizeTemplates({ ids: templateIds, ...{entities: {templates, tasks}}})
    }
)


export const getUserSelectedTemplate = createSelector(
    [
        selectUserSelectedTemplateId,
        selectUserTemplatesById,
        selectTasksById,
    ],
    (templateId, templates, tasks) => {
        if (!templateId) return null
        const normalizedTemplate = deNormalizeTemplates({ ids: [templateId], ...{entities: {templates, tasks}}})
        const { tasks: originalTasks, ...rest } = normalizedTemplate[0]
        const convertedTasks = convertToDateObject(originalTasks)
        return { ...rest, tasks: convertedTasks}
    }
)


export const getDefaultTemplatesDenormalized = createSelector(
    [
        selectDefaultTemplateIds,
        selectDefaultTemplatesById,
        selectTasksById,
    ],
    (templateIds, templates, tasks) => {
        return deNormalizeTemplates({ ids: templateIds, ...{entities: {templates, tasks}}})
    }
)

export const getUserTemplateById = createSelector(
    [
        selectUserTemplatesById,
        selectTasksById,
    ],
    (templates, tasks) => memoize(
        templateId => deNormalizeTemplates({ ids: _.concat([], templateId), ...{entities: {templates, tasks}}})
    )
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