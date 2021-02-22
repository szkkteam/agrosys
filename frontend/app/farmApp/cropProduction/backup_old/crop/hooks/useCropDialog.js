import { CROP_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default () => {
    return usePushDialog(CROP_DIALOG)

}
