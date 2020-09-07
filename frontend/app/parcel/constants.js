

export const parcelTypesEnum = {
    AGRICULTURAL_PARCEL: "AgriculturalParcel",
    CADASTRAL_PARCEL: "CadastralParcel",
    FARMERS_BLOCK: "FarmersBlock",
    PHYSICAL_BLOCK: "PhysicalBlock"
}


export const agriculturalTypeColorLookup = (typeId) => {
    switch(typeId) {
        case 1:
            return "yellow"
        case 2:
            return "green"
        case 3:
            return "brown"
        default:
            return null
    }
}