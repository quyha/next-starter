import { useEffect, RefObject } from 'react';

function useOnClickOutside(ref: RefObject<HTMLElement>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: Event): void => {
            const { current } = ref;

            if (!current || current.contains(event.target as Node)) {
                return;
            }

            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return (): void => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ ref, handler ]);
}

export default useOnClickOutside;
