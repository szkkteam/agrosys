import { createRoutine } from 'actions'
import { FARM_SELECT } from 'farm/constants'

export const listFarms = createRoutine('farms/LIST_FARMS')
export const selectFarm = (farmId) => ({
    type: FARM_SELECT,
    payload: { currentFarm: farmId }
})

