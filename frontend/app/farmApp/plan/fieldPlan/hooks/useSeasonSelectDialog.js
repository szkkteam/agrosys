import { FIELD_PLAN_SEASON_SELECT } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (success) => {
    return usePushDialog(FIELD_PLAN_SEASON_SELECT, success)

}
