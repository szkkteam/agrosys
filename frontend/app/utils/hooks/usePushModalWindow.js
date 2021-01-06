import { useState } from 'react';
import { pushModalWindow } from 'redux-promising-modals';
import useActions from './useActions'

export default () => {
    return useActions(pushModalWindow)
}