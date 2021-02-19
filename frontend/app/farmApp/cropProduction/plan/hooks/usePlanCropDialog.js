import { PLAN_CROP_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (success) => {
    return usePushDialog(PLAN_CROP_DIALOG, success)

}
