import messages from 'messages';

export const TASK_TYPES = {

    PLANTING: 'planting',
    HARVEST: 'harvest',
    TILAGE: 'tilage',
    PRODUCT_APPLICATION: 'productApplication',
    SCOUTING: 'scouting',
    SOIL_SAMPLING: 'soilSampling',
    IRRIGATION: 'irrigation',
    OTHER: 'other',
}


export const taskTypeOptions = [
    {id: TASK_TYPES.PLANTING, title: messages[TASK_TYPES.PLANTING]},
    {id: TASK_TYPES.HARVEST, title: messages[TASK_TYPES.HARVEST]},
    {id: TASK_TYPES.PRODUCT_APPLICATION, title: messages[TASK_TYPES.PRODUCT_APPLICATION]},
    {id: TASK_TYPES.TILAGE, title: messages[TASK_TYPES.TILAGE]},
    {id: TASK_TYPES.IRRIGATION, title: messages[TASK_TYPES.IRRIGATION]},
    {id: TASK_TYPES.SCOUTING, title: messages[TASK_TYPES.SCOUTING]},
    {id: TASK_TYPES.SOIL_SAMPLING, title: messages[TASK_TYPES.SOIL_SAMPLING]},
    {id: TASK_TYPES.OTHER, title: messages[TASK_TYPES.OTHER]},
]

export const getTaskTypeFromId = (value) => taskTypeOptions.find(o => o.id == value)