function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function kebabCaseToCamelCase(string: string): string {
    return string.replace(/([-_][a-z])/ig, (v) => {
        return v.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
}

export { capitalizeFirstLetter, kebabCaseToCamelCase };
