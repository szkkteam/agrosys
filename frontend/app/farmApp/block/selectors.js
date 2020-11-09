import { 
    BLOCK_CREATE_OPTION_ORDER,
    BLOCK_CREATE_OPTION_DRAW,
    BLOCK_CREATE_OPTION_UPLOAD_FILE,
    BLOCK_CREATE_OPTION_LPIS_MEPAR
 } from './constants'

/* TODO: Define a logic and give parameters based on user location, etc which options are available
* 1) Get user location (farm -> country)
* 2) For the pushModal give parameters what kind of options available
*/
export const getAvailableOptions = () => {
    const options = {
        BLOCK_CREATE_OPTION_DRAW,
        BLOCK_CREATE_OPTION_UPLOAD_FILE,
        BLOCK_CREATE_OPTION_LPIS_MEPAR,
    }
    return BLOCK_CREATE_OPTION_ORDER
}