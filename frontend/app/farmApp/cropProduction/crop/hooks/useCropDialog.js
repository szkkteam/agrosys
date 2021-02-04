import { CROP_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

export default () => {
    const push = usePushModalWindow()

    return (payload={}) => {
        return push(CROP_DIALOG, {payload})
    }
}
