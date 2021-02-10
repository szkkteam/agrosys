import convert from 'convert-units'
import { useIntl } from 'react-intl'

const unit = {narrow: 'ha', long: 'hectare'}

export default (areaM2) => {
    const intl = useIntl()

    const areaUnit = convert(areaM2).from('m2').to(unit.narrow)

    return intl.formatNumber(areaUnit, {unit: unit.long, style: 'unit', unitDisplay: 'narrow'})
}