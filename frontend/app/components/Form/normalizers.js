export const onlyDecimal = value => {
    value = value
      .replace(/[^0-9.]/g, '') // Remove all chars except numbers and .
  
    // Create an array with sections split by .
    const sections = value.split('.')
  
    // Remove any leading 0s apart from single 0
    if (sections[0] !== '0' && sections[0] !== '00') {
      sections[0] = sections[0].replace(/^0+/, '')
    } else {
      sections[0] = '0'
    }
  
    // If numbers exist after first .
    let retVal = 0
    if (sections[1]) {
      // Join first two sections and truncate end section to length 2
      retVal = sections[0] + '.' + sections[1].slice(0, 2)
    // If original value had a decimal place at the end, add it back
    } else if (value.indexOf('.') !== -1) {
      retVal = sections[0] + '.'
    // Otherwise, return only section
    } else {
        retVal = sections[0]
    }
    console.log("retVal: ", retVal)
    return retVal == ""? retVal: parseFloat(retVal)
  }