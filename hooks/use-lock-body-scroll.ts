import { useLayoutEffect } from 'react';

function useLockBodyScroll(): void {
    useLayoutEffect(() => {
        const { body } = document;

        if (body !== null) {
            body.style.overflow = 'hidden';

            return (): void => {
                body.style.overflow = 'visible';
            }
        }
        return (): void => {}
    }, []);
}

export default useLockBodyScroll;
