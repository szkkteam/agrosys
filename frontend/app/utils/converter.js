
export const convertM2ToHa = (areaInM2) => {
    return (parseFloat(areaInM2) / 10000).toFixed(2)
}

export const convertHaToM2 = (areaInHa) => {
    return (parseFloat(areaInHa) * 10000)
}