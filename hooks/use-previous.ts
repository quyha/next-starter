/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T): T {
    const ref: any = useRef<T>();
    
    useEffect(() => {
        ref.current = value;
    }, [ value ]);
    
    return ref.current;
}

export default usePrevious;
