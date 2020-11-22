

export const formatArea = unit => value => {
    console.log("areaFormatter: ", value)
    //return value !== undefined ? convertM2ToHa(value) + " " + unit : '';
    return value !== undefined ? value / 1000 : '';
}

export const formatAmount = (input) => {
    if (!input) return;
    console.log("Input: ", input)
    // Remove all existing commas before converting
    // This is not required if the normalize method is implemented and already removing commas
    const cleanedInput = input.replace(/,/g , ''); 

    // Convert to currency format
    const convertedInput = new Intl.NumberFormat().format(cleanedInput);

    return convertedInput;
}