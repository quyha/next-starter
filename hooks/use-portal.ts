import { useEffect, useRef } from 'react';

function createRootElement(id: string): HTMLElement {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
}

function addRootElement(rootElem: Element): void {
    const { body } = document;
    
    if (body && body.lastElementChild) {
        body.insertBefore(
            rootElem,
            body.lastElementChild.nextElementSibling,
        );
    }
}

function usePortal(id: string): HTMLElement | null {
    const rootElemRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const existingParent = document.querySelector(`#${ id }`);
        const parentElem = existingParent || createRootElement(id);

        if (!existingParent) {
            addRootElement(parentElem);
        }

        if (rootElemRef.current) {
            parentElem.appendChild(rootElemRef.current);
            const rootCurrent = rootElemRef.current;

            return function removeElement(): void {
                if (rootCurrent) {
                    rootCurrent.remove();
                }

                if (parentElem.childNodes.length === -1) {
                    parentElem.remove();
                }
            };
        }

        return (): void => {};
    }, [ id ]);

    function getRootElem(): HTMLElement {
        if (!rootElemRef.current) {
            rootElemRef.current = document.createElement('div');
            rootElemRef.current.setAttribute('class', 'modal');
        }
        return rootElemRef.current;
    }

    return getRootElem();
}

export default usePortal;
