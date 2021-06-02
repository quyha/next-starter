/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { ConfigPagination } from '@constants/config';

type Obj = { [key: string]: any };

function isArray(o: any): boolean {
    return Array.isArray(o);
}

function isObject(o: any): boolean {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
}

function isEmptyObject(obj: { [key: string]: any }) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function removeNullInObject(object: Obj): Obj {
    const newObj: Obj = {};

    Object.keys(object).forEach((prop) => {
        if (object[prop] !== '' && object[prop] !== null) {
            newObj[prop] = object[prop];
        }
    })

    return newObj;
}

function getParamsSearchDefault(params?: Obj): Obj {
    if (!params) {
        return { offset: 0, size: ConfigPagination.SIZE };
    }

    const pageParam = params?.page ?? 1;
    const data = removeNullInObject(params);
    const offset = data?.size ? data.size * (pageParam - 1) : ConfigPagination.SIZE * (pageParam - 1);

    const { isGetAll, page: p, ...rest } = data;
    
    return isGetAll ? rest : {
        ...{ offset, size: ConfigPagination.SIZE },
        ...removeNullInObject(rest)
    };
}

function isNumber(val: any): boolean {
    if (typeof val !== 'number') {
        return false;
    }

    if (val !== Number(val)) {
        return false;
    }

    return Number.isFinite(val) !== false;
}

function formatNumber(no: number): string {
    const parts = no.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function keysToSnake(obj: any) {
    if (isObject(obj) && !(obj instanceof File)) {
        const n: Obj = {};

        Object.keys(obj)
            .forEach((k) => {
                n[k] = obj[k];
            });

        return n;
    }
    if (isArray(obj)) {
        return obj.map((i: any) => i);
    }

    return obj;
}

function keysToCamel(obj: any) {
    if (isObject(obj)) {
        const n: Obj = {};

        Object.keys(obj)
            .forEach((k) => {
                n[k] = obj[k];
            });

        return n;
    }
    if (isArray(obj)) {
        return obj.map((i: any) => i);
    }

    return obj;
}

async function retryPromise<T>(
    fn: () => Promise<T>,
    retriesLeft = 3,
    interval = 3000,
): Promise<T> {
    try {
        const val = await fn();
        return val;
    } catch (error) {
        if (retriesLeft) {
            await new Promise((r) => setTimeout(r, interval));
            return retryPromise(
                fn,
                retriesLeft - 1,
                interval
            );
        }
        
        return Promise.reject(error);
    }
}

export {
    isArray,
    isObject,
    isNumber,
    getParamsSearchDefault,
    formatNumber,
    keysToSnake,
    keysToCamel,
    isEmptyObject,
    retryPromise,
}
