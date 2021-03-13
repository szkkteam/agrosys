import React, { useMemo } from 'react'

export default (list, keyGetter) => {
    return useMemo(() => {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }, [list])
    
}
