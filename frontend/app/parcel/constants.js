export const PARCEL_SELECT = "parcel/SELECT_PARCEL";

export const parcelTypesEnum = {
    AGRICULTURAL_PARCEL: "AgriculturalParcel",
    CADASTRAL_PARCEL: "CadastralParcel",
    FARMERS_BLOCK: "FarmersBlock",
    PHYSICAL_BLOCK: "PhysicalBlock"
}


export const agriculturalTypePropsLookup = (typeId) => {
    switch(typeId) {
        case 1:
            return {color: "yellow"}
        case 2:
            return {color: "green"}
        case 3:
            return {color: "brown"}
        default:
            return {}
    }
}