import { ROUTES } from 'routes'

export const VIEW_MAP = 'map'
export const VIEW_LIST = 'list'
export const VIEW_MODULE = 'module'

export const BLOCK_CREATE_OPTION_DRAW = 'BLOCK_CREATE_OPTION_DRAW'
export const BLOCK_CREATE_OPTION_UPLOAD_FILE = 'BLOCK_CREATE_OPTION_UPLOAD_FILE'
export const BLOCK_CREATE_OPTION_LPIS_MEPAR = 'BLOCK_CREATE_OPTION_LPIS_MEPAR'

export const BLOCK_CREATE_OPTION_ORDER = [
    BLOCK_CREATE_OPTION_DRAW,
    BLOCK_CREATE_OPTION_UPLOAD_FILE,
    BLOCK_CREATE_OPTION_LPIS_MEPAR,
]

// TODO: Other providers/options
/*
export const BLOCK_CREATE_OPTIONS = {
    BLOCK_CREATE_OPTION_DRAW
}

Map([
    [BLOCK_CREATE_OPTION_DRAW, {
        url: ROUTES.FarmCreate,
    }],
    [BLOCK_CREATE_OPTION_UPLOAD_FILE, {
        url: ROUTES.FarmCreate,
    }],
    [BLOCK_CREATE_OPTION_LPIS_MEPAR, {
        url: ROUTES.FarmCreate,
    }],
])
*/