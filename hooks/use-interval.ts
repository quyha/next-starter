import { useRef, useEffect } from 'react';

type Fn = () => void;

function useInterval(callback: Fn, delay: number): void {
    const savedCallback = useRef<Fn>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [ callback ]);

    useEffect(() => {
        const handler = (): void => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        const id = setInterval(handler, delay);

        return (): void => {
            clearInterval(id);
        }
    }, [ delay ]);
}

export default useInterval;
