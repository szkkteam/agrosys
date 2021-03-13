import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (success, cancel) => {
    return usePushDialog(FIELD_DRAW_DIALOG, success, cancel)

}
