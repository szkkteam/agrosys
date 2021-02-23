import convert from 'convert-units'
import { useIntl } from 'react-intl'

const unit = {narrow: 't', long: 'tonn'}

export default (yieldKgOrPiece, isPiece=false) => {
    const intl = useIntl()

    if (isPiece) {
        // TODO: Differentiate if its piece
        return yieldKgOrPiece
    } else {
        const yieldUnit = convert(yieldKgOrPiece).from('kg').to(unit.narrow)
        // TODO: formatjs not supporting tonn.
        return `${yieldUnit.toFixed(1)}t`
    }
}