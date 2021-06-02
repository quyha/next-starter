function useHasDom(): boolean {
    return !!(
        typeof window !== 'undefined'
        && window.document
        && window.document.createElement
    )
}

export default useHasDom;
